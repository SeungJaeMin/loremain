import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';

function AdminEventList() {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [includeUnpublished, setIncludeUnpublished] = useState(true);

  useEffect(() => {
    fetchEventsList();
  }, [currentPage, includeUnpublished]);

  const fetchEventsList = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEventsList(currentPage, 10, includeUnpublished);
      if (response.success) {
        setEventsList(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('이벤트 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" 이벤트를 삭제하시겠습니까?`)) {
      try {
        await eventService.deleteEvent(id);
        alert('이벤트가 삭제되었습니다.');
        fetchEventsList();
      } catch (error) {
        console.error('이벤트 삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePublishToggle = async (id, isPublished) => {
    try {
      if (isPublished) {
        await eventService.unpublishEvent(id);
        alert('이벤트 게시가 중단되었습니다.');
      } else {
        await eventService.publishEvent(id);
        alert('이벤트가 게시되었습니다.');
      }
      fetchEventsList();
    } catch (error) {
      console.error('게시 상태 변경 실패:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>🎯 이벤트 관리</h1>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="admin-header">
        <h1>🎯 이벤트 관리</h1>
        <Link to="/admin/events/new" className="btn btn-primary">
          새 이벤트 작성
        </Link>
      </div>

      <div className="filters">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={includeUnpublished}
            onChange={(e) => setIncludeUnpublished(e.target.checked)}
          />
          미게시 이벤트 포함
        </label>
      </div>

      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>이벤트 일자</th>
              <th>상태</th>
              <th>작성일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {eventsList.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">등록된 이벤트가 없습니다.</td>
              </tr>
            ) : (
              eventsList.map((event) => (
                <tr key={event.id}>
                  <td className="title-cell">
                    <Link to={`/admin/events/edit/${event.id}`} className="event-title">
                      {event.title}
                    </Link>
                    {event.summary && (
                      <div className="event-summary">{event.summary}</div>
                    )}
                  </td>
                  <td>{new Date(event.eventDate).toLocaleDateString('ko-KR')}</td>
                  <td>
                    <span className={`status-badge ${event.published ? 'published' : 'draft'}`}>
                      {event.published ? '게시됨' : '임시저장'}
                    </span>
                  </td>
                  <td>{new Date(event.createdAt).toLocaleDateString('ko-KR')}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/admin/events/edit/${event.id}`} 
                      className="btn btn-sm btn-secondary"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handlePublishToggle(event.id, event.published)}
                      className={`btn btn-sm ${event.published ? 'btn-warning' : 'btn-success'}`}
                    >
                      {event.published ? '게시중단' : '게시하기'}
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
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

        .events-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .events-table th,
        .events-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        .events-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #495057;
        }

        .title-cell {
          max-width: 300px;
        }

        .event-title {
          font-weight: bold;
          color: #007bff;
          text-decoration: none;
        }

        .event-title:hover {
          text-decoration: underline;
        }

        .event-summary {
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

export default AdminEventList;