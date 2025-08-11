import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import RichEditor from '../../components/RichEditor';

function AdminEventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [eventData, setEventData] = useState({
    title: '',
    content: '',
    eventDate: '',
    location: '',
    maxParticipants: '',
    registrationRequired: false,
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
        const eventDate = response.data.eventDate ? 
          new Date(response.data.eventDate).toISOString().slice(0, 16) : '';
        
        setEventData({
          title: response.data.title || '',
          content: response.data.content || '',
          eventDate: eventDate,
          location: response.data.location || '',
          maxParticipants: response.data.maxParticipants || '',
          registrationRequired: response.data.registrationRequired || false,
          published: response.data.published || false
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
        title: eventData.title,
        content: eventData.content,
        eventDate: eventData.eventDate,
        location: eventData.location,
        maxParticipants: eventData.maxParticipants ? parseInt(eventData.maxParticipants) : null,
        registrationRequired: eventData.registrationRequired || false,
        category: 'event'
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
        <h1>🎉 {isEditing ? '이벤트 수정' : '새 이벤트 작성'}</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="editor-header">
        <h1>🎉 {isEditing ? '이벤트 수정' : '새 이벤트 작성'}</h1>
        <div className="header-actions">
          <button 
            onClick={handleCancel}
            className="btn-cancel"
            disabled={saving}
          >
            취소
          </button>
          <button 
            onClick={() => handleSave(false)}
            className="btn-save"
            disabled={saving}
          >
            {saving ? '저장 중...' : '임시저장'}
          </button>
          <button 
            onClick={() => handleSave(true)}
            className="btn-publish"
            disabled={saving}
          >
            {saving ? '게시 중...' : '게시하기'}
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="이벤트 제목을 입력하세요"
              value={eventData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="title-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>이벤트 일시</label>
            <input
              type="datetime-local"
              value={eventData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className="datetime-input"
            />
          </div>
          <div className="form-group">
            <label>장소</label>
            <input
              type="text"
              placeholder="이벤트 장소 (온라인/오프라인)"
              value={eventData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="location-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>최대 참가자 수</label>
            <input
              type="number"
              placeholder="제한 없음"
              value={eventData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
              className="number-input"
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={eventData.registrationRequired}
                onChange={(e) => handleInputChange('registrationRequired', e.target.checked)}
                className="checkbox-input"
              />
              사전 등록 필요
            </label>
          </div>
        </div>

        <div className="form-group">
          <RichEditor
            value={eventData.content}
            onChange={(content) => handleInputChange('content', content)}
            placeholder="이벤트 내용을 입력하세요. 이미지를 드래그하거나 복사해서 붙여넣을 수 있습니다."
          />
        </div>
      </div>

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px 30px;
          background: white;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .editor-header h1 {
          margin: 0;
          color: #212529;
          font-size: 24px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .header-actions button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-cancel {
          background: #6c757d;
          color: white;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #5a6268;
        }

        .btn-save {
          background: #17a2b8;
          color: white;
        }

        .btn-save:hover:not(:disabled) {
          background: #138496;
        }

        .btn-publish {
          background: #28a745;
          color: white;
        }

        .btn-publish:hover:not(:disabled) {
          background: #218838;
        }

        .header-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .editor-container {
          background: white;
          border-radius: 0 0 8px 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 5px;
          font-weight: 500;
          color: #495057;
          font-size: 14px;
        }

        .title-input, .datetime-input, .location-input, .number-input {
          padding: 15px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 16px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .title-input {
          font-size: 20px;
          font-weight: 600;
          grid-column: 1 / -1;
        }

        .title-input:focus, .datetime-input:focus, .location-input:focus, .number-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 25px;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .loading {
          text-align: center;
          padding: 50px;
          font-size: 18px;
          color: #6c757d;
        }

        @media (max-width: 768px) {
          .page {
            padding: 10px;
          }

          .editor-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .header-actions {
            width: 100%;
            justify-content: center;
          }

          .editor-container {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminEventEdit;