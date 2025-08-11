import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import RichEditor from '../../components/RichEditor';

function AdminNewsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    author: '',
    published: false
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchNewsData();
    }
  }, [id, isEditing]);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await newsService.getNewsDetail(id);
      if (response.success) {
        setNewsData({
          title: response.data.title || '',
          content: response.data.content || '',
          author: response.data.author || '',
          published: response.data.published || false
        });
      }
    } catch (error) {
      console.error('뉴스 데이터 조회 실패:', error);
      alert('뉴스 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (publish = false) => {
    if (!newsData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!newsData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      setSaving(true);
      const dataToSave = {
        title: newsData.title,
        content: newsData.content,
        author: newsData.author || '관리자',
        category: 'news'
      };

      let response;
      if (isEditing) {
        response = await newsService.updateNews(id, dataToSave);
      } else {
        response = await newsService.createNews(dataToSave);
      }

      if (response.success) {
        alert(`뉴스가 ${publish ? '게시' : '저장'}되었습니다.`);
        navigate('/admin/news');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('뉴스 저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 사라집니다. 계속하시겠습니까?')) {
      navigate('/admin/news');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>📰 {isEditing ? '뉴스 수정' : '새 뉴스 작성'}</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="editor-header">
        <h1>📰 {isEditing ? '뉴스 수정' : '새 뉴스 작성'}</h1>
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
        <div className="form-group">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={newsData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="title-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="작성자 (기본: 관리자)"
            value={newsData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="author-input"
          />
        </div>

        <div className="form-group">
          <RichEditor
            value={newsData.content}
            onChange={(content) => handleInputChange('content', content)}
            placeholder="내용을 입력하세요. 이미지를 드래그하거나 복사해서 붙여넣을 수 있습니다."
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
          padding: 20px 0;
          border-bottom: 2px solid #dee2e6;
          background: white;
          border-radius: 8px 8px 0 0;
          padding: 20px 30px;
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

        .form-group {
          margin-bottom: 20px;
        }

        .title-input, .author-input {
          width: 100%;
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
        }

        .title-input:focus, .author-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
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
        }
      `}</style>
    </div>
  );
}

export default AdminNewsEdit;