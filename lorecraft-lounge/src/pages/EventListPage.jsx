import { Link } from 'react-router-dom'

function EventListPage() {
  const eventsData = [
    {
      id: 1,
      title: "2025 AGF(아시아 게임 페스티벌) 부스 참가",
      description: "8월 1일부터 3일까지 개최되는 AGF에서 로어크래프트 부스를 운영합니다. 최신 TCG와 굿즈를 만나보세요!",
      date: "2025-08-01",
      endDate: "2025-08-03",
      location: "서울 코엑스",
      type: "전시회",
      status: "upcoming",
      featured: true
    },
    {
      id: 2,
      title: "제1회 TCG Estela Masters 대회",
      description: "국내 최대 규모의 TCG 토너먼트! 우승자에게는 100만원 상금과 특별 카드를 증정합니다.",
      date: "2025-08-10",
      endDate: "2025-08-10",
      location: "강남 e스포츠 스타디움",
      type: "대회",
      status: "upcoming",
      featured: true
    },
    {
      id: 3,
      title: "여름 특별 이벤트: 카드 팩 할인",
      description: "8월 한 달간 모든 카드 팩을 30% 할인된 가격으로 만나보세요!",
      date: "2025-08-01",
      endDate: "2025-08-31",
      location: "온라인",
      type: "프로모션",
      status: "upcoming",
      featured: false
    },
    {
      id: 4,
      title: "커뮤니티 팬아트 콘테스트",
      description: "로어크래프트 캐릭터를 주제로 한 팬아트 콘테스트를 개최합니다. 최우수작에게는 태블릿을 증정!",
      date: "2025-07-15",
      endDate: "2025-08-15",
      location: "온라인",
      type: "콘테스트",
      status: "ongoing",
      featured: false
    },
    {
      id: 5,
      title: "개발자와의 만남",
      description: "TCG Estela 개발진과 직접 만나 이야기를 나누는 시간을 가져보세요.",
      date: "2025-07-20",
      endDate: "2025-07-20",
      location: "강남 로어크래프트 사무실",
      type: "미팅",
      status: "completed",
      featured: false
    }
  ];

  const upcomingEvents = eventsData.filter(event => event.status === 'upcoming');
  const ongoingEvents = eventsData.filter(event => event.status === 'ongoing');
  const featuredEvents = eventsData.filter(event => event.featured);

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

        {/* 주요 이벤트 */}
        <section className="featured-events">
          <h2>🌟 주요 이벤트</h2>
          <div className="featured-grid">
            {featuredEvents.map(event => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                className="featured-event-card"
              >
                <div className="event-header">
                  <span className="event-type">{event.type}</span>
                  <span className="event-status">{getStatusBadge(event.status)}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-details">
                  <div className="event-date">
                    📅 {event.date}
                    {event.endDate !== event.date && ` ~ ${event.endDate}`}
                  </div>
                  <div className="event-location">📍 {event.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 진행중인 이벤트 */}
        {ongoingEvents.length > 0 && (
          <section className="ongoing-events">
            <h2>🔥 진행중인 이벤트</h2>
            <div className="event-list">
              {ongoingEvents.map(event => (
                <Link 
                  key={event.id} 
                  to={`/events/${event.id}`} 
                  className="event-item ongoing"
                >
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="event-type">{event.type}</span>
                      <span className="event-status">{getStatusBadge(event.status)}</span>
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <div className="event-info">
                      <span>📅 {event.date} ~ {event.endDate}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 전체 이벤트 */}
        <section className="all-events">
          <h2>📅 전체 이벤트</h2>
          <div className="event-list">
            {eventsData.map(event => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                className={`event-item ${event.status}`}
              >
                <div className="event-content">
                  <div className="event-meta">
                    <span className="event-type">{event.type}</span>
                    <span className="event-status">{getStatusBadge(event.status)}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className="event-info">
                    <span>📅 {event.date}
                      {event.endDate !== event.date && ` ~ ${event.endDate}`}
                    </span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
                {event.featured && <span className="featured-badge">Featured</span>}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default EventListPage;