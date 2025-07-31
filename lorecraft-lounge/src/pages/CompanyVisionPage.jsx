function CompanyVisionPage() {
  const visionData = {
    mission: "창의적인 IP를 통해 전 세계 게이머들에게 새로운 재미와 감동을 전달한다",
    vision: "글로벌 엔터테인먼트 IP 전문기업으로 성장하여 문화 콘텐츠 산업을 선도한다",
    values: [
      {
        title: "창의성",
        description: "독창적이고 혁신적인 아이디어로 새로운 가치를 창출합니다"
      },
      {
        title: "품질",
        description: "최고의 품질을 추구하며 고객의 기대를 뛰어넘는 서비스를 제공합니다"
      },
      {
        title: "소통",
        description: "커뮤니티와의 활발한 소통을 통해 함께 성장하는 생태계를 만듭니다"
      },
      {
        title: "도전",
        description: "끊임없는 도전정신으로 새로운 시장과 기회를 개척합니다"
      }
    ]
  };

  return (
    <div className="company-vision-page">
      <div className="page-container">
        <header className="page-header">
          <h1>회사비전</h1>
          <p>로어크래프트가 추구하는 가치와 미래 비전을 소개합니다</p>
        </header>

        <section className="mission-section">
          <div className="mission-card">
            <h2>🎯 Mission</h2>
            <p>{visionData.mission}</p>
          </div>
        </section>

        <section className="vision-section">
          <div className="vision-card">
            <h2>🚀 Vision</h2>
            <p>{visionData.vision}</p>
          </div>
        </section>

        <section className="values-section">
          <h2>💎 Core Values</h2>
          <div className="values-grid">
            {visionData.values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="future-goals">
          <h2>🎪 2025년 목표</h2>
          <div className="goals-list">
            <div className="goal-item">
              <span className="goal-number">01</span>
              <div className="goal-content">
                <h4>TCG Estela 글로벌 런칭</h4>
                <p>해외 시장 진출을 통한 글로벌 IP 확장</p>
              </div>
            </div>
            <div className="goal-item">
              <span className="goal-number">02</span>
              <div className="goal-content">
                <h4>미디어 콘텐츠 확대</h4>
                <p>웹툰, 애니메이션 등 다양한 미디어 콘텐츠 제작</p>
              </div>
            </div>
            <div className="goal-item">
              <span className="goal-number">03</span>
              <div className="goal-content">
                <h4>커뮤니티 플랫폼 강화</h4>
                <p>사용자 참여형 커뮤니티 기능 고도화</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CompanyVisionPage;


