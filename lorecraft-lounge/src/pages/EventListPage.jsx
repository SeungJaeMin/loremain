import { Link } from 'react-router-dom';
import { COMPANY } from '../constants/textResources'
import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

function EventListPage() {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEventsList(currentPage, 10, false, false);
        if (response.success) {
          setEventsList(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          setError('이벤트를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('Events API Error:', err);
        setError('서버 연결에 실패했습니다.');
        // 폴백 데이터 사용
        setEventsList([
          {
            id: 1,
            title: "${COMPANY.nameEn} 런칭 이벤트",
            eventDate: "2025-09-01T14:00:00",
            location: "서울 강남구",
            maxParticipants: 100,
            currentParticipants: 0,
            published: true
          },
          {
            id: 2,
            title: "TCG 토너먼트",
            eventDate: "2025-10-15T10:00:00",
            location: "부산 해운대구",
            maxParticipants: 50,
            currentParticipants: 0,
            published: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    
    if (eventDateTime > now) {
      return { status: 'upcoming', label: '🔜 예정' };
    } else if (eventDateTime.toDateString() === now.toDateString()) {
      return { status: 'ongoing', label: '🔥 진행중' };
    } else {
      return { status: 'completed', label: '✅ 완료' };
    }
  };

  if (loading) {
    return (
      <div className="event-list-page">
        <div className="page-container">
          <div className="loading">이벤트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error && eventsList.length === 0) {
    return (
      <div className="event-list-page">
        <div className="page-container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'upcoming': return '🔜 예정';
      case 'ongoing': return '🔥 진행중';
      case 'completed': return '✅ 완료';
      default: return status;
    }
  };

  return (
    <div className="event-list-page">
      <div className="page-container">
        <header className="page-header">
          <h1>이벤트</h1>
          <p>로어크래프트의 다양한 이벤트와 대회에 참여하세요!</p>
        </header>

        {/* 전체 이벤트 */}
        <section className="all-events">
          <h2>📅 전체 이벤트</h2>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="event-list">
            {eventsList.map(event => {
              const eventStatus = getEventStatus(event.eventDate);
              return (
                <Link 
                  key={event.id} 
                  to={`/events/${event.id}`} 
                  className={`event-item ${eventStatus.status}`}
                >
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="event-status">{eventStatus.label}</span>
                      {event.published && <span className="published-badge">Published</span>}
                    </div>
                    <h4>{event.title}</h4>
                    <div className="event-info">
                      <span>📅 {formatDate(event.eventDate)}</span>
                      <span>📍 {event.location}</span>
                      {event.maxParticipants && (
                        <span>👥 {event.currentParticipants}/{event.maxParticipants}명</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                이전
              </button>
              <span>
                {currentPage + 1} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
              >
                다음
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default EventListPage;