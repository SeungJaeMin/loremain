import { useParams } from 'react-router-dom';

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
    <div className="event-detail-page" style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
      <h1>{event.title}</h1>
      <div style={{ color: "#888", marginBottom: 16 }}>
        {event.date} | {event.author}
      </div>
      <img src={event.image} alt={event.title} style={{ width: "100%", borderRadius: 8, marginBottom: 24 }} />
      <div
        className="event-content"
        style={{ fontSize: 18, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: event.content }}
      />
    </div>
  );
}

export default EventDetailPage;