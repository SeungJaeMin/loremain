import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';

function AdminNewsList() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [includeUnpublished, setIncludeUnpublished] = useState(true);

  useEffect(() => {
    fetchNewsList();
  }, [currentPage, includeUnpublished]);

  const fetchNewsList = async () => {
    try {
      setLoading(true);
      const response = await newsService.getNewsList(currentPage, 10, includeUnpublished);
      if (response.success) {
        setNewsList(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('뉴스 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" 뉴스를 삭제하시겠습니까?`)) {
      try {
        await newsService.deleteNews(id);
        alert('뉴스가 삭제되었습니다.');
        fetchNewsList();
      } catch (error) {
        console.error('뉴스 삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePublishToggle = async (id, isPublished) => {
    try {
      if (isPublished) {
        await newsService.unpublishNews(id);
        alert('뉴스 게시가 중단되었습니다.');
      } else {
        await newsService.publishNews(id);
        alert('뉴스가 게시되었습니다.');
      }
      fetchNewsList();
    } catch (error) {
      console.error('게시 상태 변경 실패:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>📰 뉴스 관리</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="admin-header">
        <h1>📰 뉴스 관리</h1>
        <Link to="/admin/news/new" className="btn btn-primary">
          새 뉴스 작성
        </Link>
      </div>

      <div className="filters">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={includeUnpublished}
            onChange={(e) => setIncludeUnpublished(e.target.checked)}
          />
          미게시 뉴스 포함
        </label>
      </div>

      <div className="news-table">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>상태</th>
              <th>작성일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">등록된 뉴스가 없습니다.</td>
              </tr>
            ) : (
              newsList.map((news) => (
                <tr key={news.id}>
                  <td className="title-cell">
                    <Link to={`/admin/news/edit/${news.id}`} className="news-title">
                      {news.title}
                    </Link>
                    {news.summary && (
                      <div className="news-summary">{news.summary}</div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${news.published ? 'published' : 'draft'}`}>
                      {news.published ? '게시됨' : '임시저장'}
                    </span>
                  </td>
                  <td>{new Date(news.created_at || news.createdAt).toLocaleDateString('ko-KR')}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/admin/news/edit/${news.id}`} 
                      className="btn btn-sm btn-secondary"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handlePublishToggle(news.id, news.published)}
                      className={`btn btn-sm ${news.published ? 'btn-warning' : 'btn-success'}`}
                    >
                      {news.published ? '게시중단' : '게시하기'}
                    </button>
                    <button
                      onClick={() => handleDelete(news.id, news.title)}
                      className="btn btn-sm btn-danger"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="btn btn-secondary"
          >
            이전
          </button>
          <span className="page-info">
            {currentPage + 1} / {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="btn btn-secondary"
          >
            다음
          </button>
        </div>
      )}

      <style jsx>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filters {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }

        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .news-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .news-table th,
        .news-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        .news-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #495057;
        }

        .title-cell {
          max-width: 300px;
        }

        .news-title {
          font-weight: bold;
          color: #007bff;
          text-decoration: none;
        }

        .news-title:hover {
          text-decoration: underline;
        }

        .news-summary {
          font-size: 12px;
          color: #6c757d;
          margin-top: 4px;
          line-height: 1.4;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .status-badge.published {
          background-color: #d4edda;
          color: #155724;
        }

        .status-badge.draft {
          background-color: #f8d7da;
          color: #721c24;
        }

        .actions-cell {
          white-space: nowrap;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-size: 12px;
          margin-right: 5px;
        }

        .btn-primary { background-color: #007bff; color: white; }
        .btn-secondary { background-color: #6c757d; color: white; }
        .btn-success { background-color: #28a745; color: white; }
        .btn-warning { background-color: #ffc107; color: #212529; }
        .btn-danger { background-color: #dc3545; color: white; }

        .btn:hover {
          opacity: 0.9;
        }

        .btn-sm {
          padding: 4px 8px;
          font-size: 11px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }

        .page-info {
          font-size: 14px;
          color: #6c757d;
        }

        .no-data {
          text-align: center;
          color: #6c757d;
          padding: 40px;
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

export default AdminNewsList;