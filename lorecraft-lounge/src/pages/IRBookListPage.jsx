import { Link } from 'react-router-dom'

function IRBookListPage() {
  const irReports = [
    {
      id: 1,
      title: "2025년 2분기 실적 보고서",
      description: "로어크래프트의 2025년 2분기 재무 실적 및 사업 성과를 담은 보고서입니다.",
      date: "2025-07-31",
      quarter: "2025 Q2",
      type: "분기보고서",
      fileSize: "2.3MB",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "2025년 1분기 실적 보고서",
      description: "1분기 매출 성장률 120% 달성 및 주요 사업 성과를 정리한 보고서",
      date: "2025-04-30",
      quarter: "2025 Q1",
      type: "분기보고서",
      fileSize: "1.8MB",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "2024년 연간 실적 보고서",
      description: "창립 후 첫 완전한 사업년도의 성과와 미래 전략을 담은 종합 보고서",
      date: "2025-01-31",
      quarter: "2024 연간",
      type: "연간보고서",
      fileSize: "5.2MB",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "ESG 경영 보고서 2024",
      description: "환경, 사회, 지배구조 관련 로어크래프트의 지속가능경영 활동 보고서",
      date: "2024-12-31",
      quarter: "2024",
      type: "ESG보고서",
      fileSize: "3.1MB",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "투자설명회 자료",
      description: "2025년 상반기 투자설명회에서 발표된 사업 계획 및 투자 포인트 자료",
      date: "2025-06-15",
      quarter: "2025",
      type: "투자자료",
      fileSize: "4.7MB",
      downloadUrl: "#",
      featured: false
    }
  ];

  const featuredReports = irReports.filter(report => report.featured);
  const quarterlyReports = irReports.filter(report => report.type === "분기보고서");

  return (
    <div className="ir-book-list-page">
      <div className="page-container">
        <header className="page-header">
          <h1>IRBook</h1>
          <p>로어크래프트의 투자자 관계 자료 및 재무 보고서를 확인하실 수 있습니다</p>
        </header>

        {/* 주요 보고서 */}
        <section className="featured-reports">
          <h2>📊 주요 보고서</h2>
          <div className="featured-grid">
            {featuredReports.map(report => (
              <div key={report.id} className="featured-report-card">
                <div className="report-header">
                  <span className="report-type">{report.type}</span>
                  <span className="report-quarter">{report.quarter}</span>
                </div>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <div className="report-details">
                  <div className="report-date">📅 {report.date}</div>
                  <div className="report-size">📁 {report.fileSize}</div>
                </div>
                <div className="report-actions">
                  <Link to={`/irbook/${report.id}`} className="btn-view">
                    자세히 보기
                  </Link>
                  <a href={report.downloadUrl} className="btn-download">
                    📥 다운로드
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 분기별 실적 */}
        <section className="quarterly-reports">
          <h2>📈 분기별 실적 보고서</h2>
          <div className="quarterly-timeline">
            {quarterlyReports.map(report => (
              <div key={report.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{report.quarter}</h4>
                    <span className="report-date">{report.date}</span>
                  </div>
                  <h5>{report.title}</h5>
                  <p>{report.description}</p>
                  <div className="timeline-actions">
                    <Link to={`/irbook/${report.id}`} className="btn-small">
                      보기
                    </Link>
                    <a href={report.downloadUrl} className="btn-small download">
                      다운로드
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 전체 보고서 */}
        <section className="all-reports">
          <h2>📋 전체 보고서</h2>
          <div className="reports-table">
            <div className="table-header">
              <div className="col-title">제목</div>
              <div className="col-type">유형</div>
              <div className="col-date">발행일</div>
              <div className="col-size">크기</div>
              <div className="col-actions">다운로드</div>
            </div>
            {irReports.map(report => (
              <div key={report.id} className="table-row">
                <div className="col-title">
                  <Link to={`/irbook/${report.id}`} className="report-link">
                    {report.title}
                  </Link>
                  {report.featured && <span className="featured-badge">New</span>}
                </div>
                <div className="col-type">{report.type}</div>
                <div className="col-date">{report.date}</div>
                <div className="col-size">{report.fileSize}</div>
                <div className="col-actions">
                  <a href={report.downloadUrl} className="download-btn">
                    📥
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 투자자 정보 */}
        <section className="investor-info">
          <h2>💼 투자자 문의</h2>
          <div className="contact-card">
            <h4>IR 담당자</h4>
            <div className="contact-details">
              <p><strong>이메일:</strong> ir@lorecraft.co.kr</p>
              <p><strong>전화:</strong> 02-1234-5678</p>
              <p><strong>팩스:</strong> 02-1234-5679</p>
            </div>
            <p className="contact-note">
              투자자 관련 문의사항이 있으시면 언제든지 연락주세요.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IRBookListPage;