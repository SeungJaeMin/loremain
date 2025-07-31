import { useParams, Link } from 'react-router-dom';

function NewsDetailPage() {
  const { id } = useParams();

  // 목업 데이터 (실제 서비스에서는 API로 받아옴)
  const news = {
    id,
    title: "로어크래프트, 신규 TCG 프로젝트 발표",
    date: "2025-07-31",
    author: "홍길동",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    content: `
      로어크래프트가 새로운 TCG 프로젝트를 공식 발표했습니다.
      이번 프로젝트는 혁신적인 게임 시스템과 독창적인 세계관을 바탕으로 개발 중이며,
      2026년 상반기 출시를 목표로 하고 있습니다.
      <br/><br/>
      관계자는 "유저와 소통하며 최고의 TCG 경험을 제공하겠다"고 밝혔습니다.
    `
  };

  return (
    <div className="news-detail-page">
      <Link to="/news" className="back-button">
        ← 뉴스 목록으로 돌아가기
      </Link>
      <div className="detail-header">
        <h1 className="detail-title">{news.title}</h1>
        <div className="detail-meta">
          {news.date} | {news.author}
        </div>
      </div>
      <img src={news.image} alt={news.title} className="detail-image" />
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}

export default NewsDetailPage;