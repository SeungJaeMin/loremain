function CompanyVisionPage() {
  const visionData = {
    mission: "창의적인 IP를 통해 전 세계 게이머들에게 새로운 재미와 감동을 전달한다",
    vision: "글로벌 엔터테인먼트 IP 전문기업으로 성장하여 문화 콘텐츠 산업을 선도한다",
    values: [
      {
        title: "창의성",
        description: "독창적이고 혁신적인 아이디어로 새로운 가치를 창출합니다",
        icon: "🎨"
      },
      {
        title: "품질",
        description: "최고의 품질을 추구하며 고객의 기대를 뛰어넘는 서비스를 제공합니다",
        icon: "⭐"
      },
      {
        title: "소통",
        description: "커뮤니티와의 활발한 소통을 통해 함께 성장하는 생태계를 만듭니다",
        icon: "💬"
      },
      {
        title: "도전",
        description: "끊임없는 도전정신으로 새로운 시장과 기회를 개척합니다",
        icon: "⚡"
      }
    ],
    roadmap: [
      {
        year: "2025",
        quarter: "Q1",
        title: "TCG Estela 글로벌 런칭",
        description: "해외 시장 진출을 통한 글로벌 IP 확장",
        status: "in-progress"
      },
      {
        year: "2025",
        quarter: "Q2",
        title: "미디어 콘텐츠 확대",
        description: "웹툰, 애니메이션 등 다양한 미디어 콘텐츠 제작",
        status: "planned"
      },
      {
        year: "2025",
        quarter: "Q3",
        title: "커뮤니티 플랫폼 강화",
        description: "사용자 참여형 커뮤니티 기능 고도화",
        status: "planned"
      },
      {
        year: "2025",
        quarter: "Q4",
        title: "IP 확장 및 파트너십",
        description: "전략적 파트너십을 통한 IP 생태계 확장",
        status: "planned"
      }
    ]
  };

  return (
    <div className="company-vision-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Our Vision</h1>
          <p className="hero-subtitle">
            로어크래프트가 그려가는 미래와 추구하는 가치, 
            그리고 전 세계 게이머들과 함께 만들어갈 내일을 소개합니다.
          </p>
          <div className="hero-highlight">
            <span className="highlight-text">Building Tomorrow's Entertainment</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="vision-container">
        {/* Mission & Vision */}
        <section className="mission-vision-section">
          <div className="mv-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <div className="card-header">
                <h2>Our Mission</h2>
                <span className="card-subtitle">사명</span>
              </div>
              <p className="card-content">{visionData.mission}</p>
              <div className="card-decoration"></div>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">🚀</div>
              <div className="card-header">
                <h2>Our Vision</h2>
                <span className="card-subtitle">비전</span>
              </div>
              <p className="card-content">{visionData.vision}</p>
              <div className="card-decoration"></div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="values-section">
          <div className="section-header">
            <h2>Core Values</h2>
            <p>로어크래프트를 움직이는 핵심 가치관</p>
          </div>
          <div className="values-grid">
            {visionData.values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <div className="value-number">0{index + 1}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="roadmap-section">
          <div className="section-header">
            <h2>2025 Roadmap</h2>
            <p>올해 로어크래프트가 달성하고자 하는 주요 목표들</p>
          </div>
          <div className="roadmap-timeline">
            {visionData.roadmap.map((milestone, index) => (
              <div key={index} className={`milestone ${milestone.status}`}>
                <div className="milestone-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>
                <div className="milestone-content">
                  <div className="milestone-header">
                    <span className="milestone-quarter">{milestone.quarter}</span>
                    <span className={`milestone-status ${milestone.status}`}>
                      {milestone.status === 'in-progress' ? 'In Progress' : 'Planned'}
                    </span>
                  </div>
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Outlook */}
        <section className="future-section">
          <div className="future-content">
            <h2>Looking Forward</h2>
            <p className="future-description">
              로어크래프트는 단순한 게임 회사를 넘어, 창의적인 IP로 전 세계 사람들의 
              삶에 즐거움과 감동을 선사하는 엔터테인먼트 기업으로 성장하고자 합니다.
            </p>
            <div className="future-stats">
              <div className="future-stat">
                <span className="stat-number">Global</span>
                <span className="stat-label">Market Expansion</span>
              </div>
              <div className="future-stat">
                <span className="stat-number">Multi</span>
                <span className="stat-label">Platform Content</span>
              </div>
              <div className="future-stat">
                <span className="stat-number">Creative</span>
                <span className="stat-label">IP Development</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .company-vision-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: white;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v30h30zm0 0v30c16.569 0 30-13.431 30-30H30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 24px;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.7;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-highlight {
          display: inline-block;
          padding: 15px 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .highlight-text {
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .vision-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mission-vision-section {
          padding: 100px 0;
        }

        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .mission-card,
        .vision-card {
          background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
          border: 1px solid #333;
          border-radius: 24px;
          padding: 50px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .mission-card:hover,
        .vision-card:hover {
          transform: translateY(-10px);
          border-color: #667eea;
          box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(102, 126, 234, 0.15);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 24px;
          display: block;
        }

        .card-header {
          margin-bottom: 24px;
        }

        .card-header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-subtitle {
          color: #999;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .card-content {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #ccc;
          font-weight: 500;
        }

        .card-decoration {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          opacity: 0.1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header h2 {
          font-size: 3rem;
          margin-bottom: 16px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #999;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .values-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .value-card {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
          border: 1px solid #444;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .value-card:hover {
          transform: translateY(-8px);
          border-color: #667eea;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(102, 126, 234, 0.1);
        }

        .value-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          display: block;
        }

        .value-number {
          position: absolute;
          top: 20px;
          right: 25px;
          font-size: 3rem;
          font-weight: 900;
          color: rgba(102, 126, 234, 0.2);
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: #667eea;
        }

        .value-description {
          color: #ccc;
          line-height: 1.7;
          font-size: 1rem;
        }

        .roadmap-section {
          padding: 100px 0;
        }

        .roadmap-timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .milestone {
          display: flex;
          margin-bottom: 60px;
          position: relative;
        }

        .milestone:last-child .marker-line {
          display: none;
        }

        .milestone-marker {
          position: relative;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .marker-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #333;
          border: 3px solid #667eea;
          position: relative;
          z-index: 1;
        }

        .milestone.in-progress .marker-dot {
          background: #667eea;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .marker-line {
          width: 3px;
          height: 80px;
          background: #333;
          margin-top: 10px;
        }

        .milestone-content {
          flex: 1;
          background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
          border: 1px solid #333;
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .milestone-content:hover {
          border-color: #667eea;
          transform: translateX(10px);
        }

        .milestone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .milestone-quarter {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .milestone-status {
          font-size: 0.8rem;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .milestone-status.in-progress {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .milestone-status.planned {
          background: rgba(156, 163, 175, 0.2);
          color: #9ca3af;
        }

        .milestone-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }

        .milestone-description {
          color: #ccc;
          line-height: 1.6;
        }

        .future-section {
          padding: 100px 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          text-align: center;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .future-content h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .future-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #ccc;
          max-width: 800px;
          margin: 0 auto 60px auto;
        }

        .future-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .future-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .future-stat .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: #667eea;
          margin-bottom: 8px;
        }

        .future-stat .stat-label {
          font-size: 1rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

      `}</style>
    </div>
  );
}

export default CompanyVisionPage;


