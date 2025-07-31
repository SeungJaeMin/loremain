import { useParams, Link } from 'react-router-dom';

function EventDetailPage() {
  const { id } = useParams();

  // 목업 데이터
  const event = {
    id,
    title: "2025 여름 TCG 챔피언십 개최 안내",
    date: "2025-08-15",
    author: "운영팀",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    content: `
      로어크래프트가 주최하는 2025 여름 TCG 챔피언십이 개최됩니다!
      <br/><br/>
      <strong>일정:</strong> 2025년 8월 28일(목) ~ 8월 30일(토)<br/>
      <strong>장소:</strong> 서울 코엑스 3층 이벤트홀<br/>
      <br/>
      참가 신청 및 자세한 내용은 공식 홈페이지에서 확인해 주세요.
    `
  };

  return (
    <div className="event-detail-page">
      <Link to="/events" className="back-button">
        ← 이벤트 목록으로 돌아가기
      </Link>
      <div className="detail-header">
        <h1 className="detail-title">{event.title}</h1>
        <div className="detail-meta">
          {event.date} | {event.author}
        </div>
      </div>
      <img src={event.image} alt={event.title} className="detail-image" />
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: event.content }}
      />
    </div>
  );
}

export default EventDetailPage;