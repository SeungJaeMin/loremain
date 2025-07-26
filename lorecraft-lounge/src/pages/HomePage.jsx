import { Link } from 'react-router-dom'

function HomePage() {
  // Mock 데이터
  const recentNews = [
    { id: 1, title: "Lorecraft 신규 서비스 런칭", date: "2025-07-25" },
    { id: 2, title: "Q2 실적 발표", date: "2025-07-20" },
    { id: 3, title: "새로운 파트너십 체결", date: "2025-07-15" }
  ];

  const upcomingEvents = [
    { id: 1, title: "분기별 전체 회의", date: "2025-08-01" },
    { id: 2, title: "기술 세미나", date: "2025-08-10" }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🏢 Lorecraft Company</h1>
        <p>혁신적인 기술로 미래를 만들어가는 회사</p>
        <div className="hero-buttons">
          <Link to="/company/info" className="btn btn-primary">
            회사 소개 보기
          </Link>
          <Link to="/company/vision" className="btn btn-secondary">
            비전 확인하기
          </Link>
        </div>
      </div>

      <div className="content-grid">
        
        {/* 최근 뉴스 */}
        <section className="content-card">
          <div className="card-header">
            <h2>📰 최근 뉴스</h2>
            <Link to="/news" className="view-all">전체보기 →</Link>
          </div>
          <div className="news-list">
            {recentNews.map(news => (
              <Link 
                key={news.id} 
                to={`/news/${news.id}`} 
                className="news-item"
              >
                <span className="news-title">{news.title}</span>
                <span className="news-date">{news.date}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 다가오는 이벤트 */}
        <section className="content-card">
          <div className="card-header">
            <h2>🎉 다가오는 이벤트</h2>
            <Link to="/events" className="view-all">전체보기 →</Link>
          </div>
          <div className="event-list">
            {upcomingEvents.map(event => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                className="event-item"
              >
                <span className="event-title">{event.title}</span>
                <span className="event-date">{event.date}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 빠른 링크 */}
        <section className="content-card">
          <div className="card-header">
            <h2>🔗 빠른 링크</h2>
          </div>
          <div className="quick-links">
            <Link to="/irbook" className="quick-link">
              📊 IRBook 보기
            </Link>
            <Link to="/company/vision" className="quick-link">
              🎯 회사 비전
            </Link>
            <Link to="/events" className="quick-link">
              🎉 이벤트 목록
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

export default HomePage