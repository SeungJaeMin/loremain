import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEventDetail(id);
        if (response.success) {
          setEvent(response.data);
        } else {
          setError('이벤트를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('이벤트 상세 조회 오류:', err);
        setError('이벤트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="event-detail-page">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-detail-page">
        <Link to="/events" className="back-button">
          ← 이벤트 목록으로 돌아가기
        </Link>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-detail-page">
        <Link to="/events" className="back-button">
          ← 이벤트 목록으로 돌아가기
        </Link>
        <div className="error">이벤트를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="event-detail-page">
      <Link to="/events" className="back-button">
        ← 이벤트 목록으로 돌아가기
      </Link>
      <div className="detail-header">
        <h1 className="detail-title">{event.title}</h1>
        <div className="detail-meta">
          이벤트 일자: {new Date(event.eventDate).toLocaleDateString('ko-KR')} | 
          작성일: {new Date(event.createdAt).toLocaleDateString('ko-KR')}
        </div>
      </div>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="detail-image" />
      )}
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: event.content }}
      />
      {event.registrationRequired && (
        <div className="event-registration">
          <p><strong>등록 필요:</strong> 이 이벤트는 사전 등록이 필요합니다.</p>
          {event.maxParticipants && (
            <p><strong>최대 참가자:</strong> {event.maxParticipants}명</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;