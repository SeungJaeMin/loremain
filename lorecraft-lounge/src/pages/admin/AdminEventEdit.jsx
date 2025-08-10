import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';

function AdminEventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [eventData, setEventData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    eventDate: '',
    registrationRequired: false,
    maxParticipants: '',
    published: false
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchEventData();
    }
  }, [id, isEditing]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEventDetail(id);
      if (response.success) {
        const event = response.data;
        setEventData({
          title: event.title || '',
          summary: event.summary || '',
          content: event.content || '',
          imageUrl: event.imageUrl || '',
          eventDate: event.eventDate ? event.eventDate.substring(0, 16) : '',
          registrationRequired: event.registrationRequired || false,
          maxParticipants: event.maxParticipants || '',
          published: event.published || false
        });
      }
    } catch (error) {
      console.error('이벤트 데이터 조회 실패:', error);
      alert('이벤트 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (publish = false) => {
    if (!eventData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!eventData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!eventData.eventDate) {
      alert('이벤트 일자를 입력해주세요.');
      return;
    }

    try {
      setSaving(true);
      const dataToSave = {
        ...eventData,
        published: publish,
        maxParticipants: eventData.maxParticipants ? parseInt(eventData.maxParticipants) : null
      };

      let response;
      if (isEditing) {
        response = await eventService.updateEvent(id, dataToSave);
      } else {
        response = await eventService.createEvent(dataToSave);
      }

      if (response.success) {
        alert(`이벤트가 ${publish ? '게시' : '저장'}되었습니다.`);
        navigate('/admin/events');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('이벤트 저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 사라집니다. 계속하시겠습니까?')) {
      navigate('/admin/events');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>🎯 {isEditing ? '이벤트 수정' : '새 이벤트 작성'}</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="editor-header">
        <h1>🎯 {isEditing ? '이벤트 수정' : '새 이벤트 작성'}</h1>
        <div className="header-actions">
          <button onClick={handleCancel} className="btn btn-secondary">
            취소
          </button>
          <button 
            onClick={() => handleSave(false)} 
            disabled={saving}
            className="btn btn-outline"
          >
            임시저장
          </button>
          <button 
            onClick={() => handleSave(true)} 
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? '저장 중...' : '게시하기'}
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="이벤트 제목을 입력하세요"
              value={eventData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="title-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>이벤트 일시</label>
              <input
                type="datetime-local"
                value={eventData.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                className="date-input"
                required
              />
            </div>
            <div className="form-group">
              <label>최대 참가자 수 (선택사항)</label>
              <input
                type="number"
                placeholder="제한 없음"
                value={eventData.maxParticipants}
                onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                className="number-input"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={eventData.registrationRequired}
                onChange={(e) => handleInputChange('registrationRequired', e.target.checked)}
              />
              사전 등록 필요
            </label>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="요약 (선택사항)"
              value={eventData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              className="summary-input"
            />
          </div>

          <div className="form-group">
            <input
              type="url"
              placeholder="이미지 URL (선택사항)"
              value={eventData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              className="image-input"
            />
            {eventData.imageUrl && (
              <div className="image-preview">
                <img src={eventData.imageUrl} alt="미리보기" />
              </div>
            )}
          </div>

          <div className="form-group">
            <textarea
              placeholder="이벤트 내용을 입력하세요..."
              value={eventData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="content-textarea"
            />
          </div>

          <div className="editor-help">
            <h3>작성 팁</h3>
            <ul>
              <li>HTML 태그를 사용할 수 있습니다 (예: &lt;br/&gt;, &lt;strong&gt;, &lt;em&gt;)</li>
              <li>링크: &lt;a href="URL"&gt;텍스트&lt;/a&gt;</li>
              <li>이미지: &lt;img src="URL" alt="설명" /&gt;</li>
              <li>줄바꿈: &lt;br/&gt; 또는 &lt;p&gt;&lt;/p&gt;</li>
            </ul>
          </div>
        </div>

        <div className="preview-section">
          <h3>미리보기</h3>
          <div className="preview-content">
            <h2 className="preview-title">{eventData.title || '이벤트 제목을 입력하세요'}</h2>
            <div className="preview-meta">
              <span className="preview-date">
                📅 {eventData.eventDate ? new Date(eventData.eventDate).toLocaleString('ko-KR') : '일시 미정'}
              </span>
              {eventData.registrationRequired && (
                <span className="preview-registration">🎫 사전 등록 필요</span>
              )}
              {eventData.maxParticipants && (
                <span className="preview-participants">👥 최대 {eventData.maxParticipants}명</span>
              )}
            </div>
            {eventData.summary && (
              <p className="preview-summary">{eventData.summary}</p>
            )}
            {eventData.imageUrl && (
              <img src={eventData.imageUrl} alt="이벤트 이미지" className="preview-image" />
            )}
            <div 
              className="preview-text"
              dangerouslySetInnerHTML={{ 
                __html: eventData.content || '<p>이벤트 내용을 입력하세요...</p>' 
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dee2e6;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .editor-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          height: calc(100vh - 200px);
        }

        .editor-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group label {
          margin-bottom: 5px;
          font-weight: bold;
          color: #495057;
          font-size: 14px;
        }

        .checkbox-label {
          flex-direction: row !important;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 0;
          font-weight: normal !important;
        }

        .title-input {
          font-size: 24px;
          font-weight: bold;
          padding: 15px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          outline: none;
        }

        .title-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .date-input,
        .number-input,
        .summary-input,
        .image-input {
          font-size: 14px;
          padding: 10px;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          outline: none;
        }

        .date-input:focus,
        .number-input:focus,
        .summary-input:focus,
        .image-input:focus {
          border-color: #007bff;
        }

        .image-preview {
          margin-top: 10px;
        }

        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          border-radius: 4px;
          object-fit: cover;
        }

        .content-textarea {
          flex: 1;
          min-height: 250px;
          padding: 15px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .content-textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .editor-help {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          font-size: 12px;
        }

        .editor-help h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
        }

        .editor-help ul {
          margin: 0;
          padding-left: 20px;
        }

        .editor-help li {
          margin-bottom: 5px;
          color: #6c757d;
        }

        .preview-section {
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          overflow-y: auto;
        }

        .preview-section h3 {
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #dee2e6;
          color: #495057;
        }

        .preview-content {
          line-height: 1.6;
        }

        .preview-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #212529;
        }

        .preview-meta {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 15px;
          font-size: 14px;
          color: #6c757d;
        }

        .preview-date,
        .preview-registration,
        .preview-participants {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .preview-summary {
          color: #6c757d;
          font-style: italic;
          margin-bottom: 20px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .preview-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .preview-text {
          color: #495057;
        }

        .btn {
          padding: 8px 16px;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-outline {
          background-color: white;
          color: #007bff;
          border-color: #007bff;
        }

        .btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
}

export default AdminEventEdit;