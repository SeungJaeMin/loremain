import { Link } from 'react-router-dom'

function NewsListPage() {
  const newsData = [
    {
      id: 1,
      title: "로어크래프트, TCG Estela 글로벌 런칭 발표",
      summary: "새로운 트레이딩 카드 게임 'Estela'를 전 세계 시장에 출시한다고 발표했습니다.",
      date: "2025-07-30",
      category: "제품출시",
      featured: true
    },
    {
      id: 2,
      title: "2025 AGF(아시아 게임 페스티벌) 참가 확정",
      summary: "8월 개최되는 AGF에서 최신 게임과 굿즈를 선보일 예정입니다.",
      date: "2025-07-28",
      category: "이벤트",
      featured: false
    },
    {
      id: 3,
      title: "제1회 TCG Estela Masters 대회 개최",
      summary: "국내 최대 규모의 TCG 토너먼트를 8월 10일 개최합니다.",
      date: "2025-07-25",
      category: "대회",
      featured: true
    },
    {
      id: 4,
      title: "로어크래프트 웹툰 시리즈 연재 시작",
      summary: "인기 IP를 바탕으로 한 웹툰 시리즈가 네이버웹툰에서 연재를 시작했습니다.",
      date: "2025-07-22",
      category: "콘텐츠",
      featured: false
    },
    {
      id: 5,
      title: "Q2 실적 발표: 전년 대비 150% 성장",
      summary: "2분기 매출이 전년 동기 대비 150% 증가하며 성장세를 이어가고 있습니다.",
      date: "2025-07-20",
      category: "실적",
      featured: false
    },
    {
      id: 6,
      title: "신규 인재 채용 공고",
      summary: "게임 개발자, 마케터, 커뮤니티 매니저 등 다양한 분야의 인재를 모집합니다.",
      date: "2025-07-18",
      category: "채용",
      featured: false
    }
  ];

  const featuredNews = newsData.filter(news => news.featured);
  const regularNews = newsData.filter(news => !news.featured);

  return (
    <div className="news-list-page">
      <div className="page-container">
        <header className="page-header">
          <h1>뉴스</h1>
          <p>로어크래프트의 최신 소식을 확인하세요!</p>
        </header>

        {/* 주요 뉴스 */}
        <section className="featured-news">
          <h2>🔥 주요 뉴스</h2>
          <div className="featured-grid">
            {featuredNews.map(news => (
              <Link 
                key={news.id} 
                to={`/news/${news.id}`} 
                className="featured-news-card"
              >
                <div className="news-category">{news.category}</div>
                <h3>{news.title}</h3>
                <p>{news.summary}</p>
                <div className="news-date">{news.date}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* 전체 뉴스 */}
        <section className="all-news">
          <h2>📰 전체 뉴스</h2>
          <div className="news-list">
            {newsData.map(news => (
              <Link 
                key={news.id} 
                to={`/news/${news.id}`} 
                className="news-item"
              >
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-category">{news.category}</span>
                    <span className="news-date">{news.date}</span>
                  </div>
                  <h4>{news.title}</h4>
                  <p>{news.summary}</p>
                </div>
                {news.featured && <span className="featured-badge">Featured</span>}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewsListPage;

