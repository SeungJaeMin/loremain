import { useState, useEffect } from 'react';
import { COMPANY } from '../constants/textResources'
import { companyService } from '../services/companyService';

function CompanyInfoPage() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setLoading(true);
        const response = await companyService.getCompanyInfo();
        if (response.success) {
          setCompanyInfo(response.data);
        } else {
          setError('회사 정보를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('CompanyInfo API Error:', err);
        setError('서버 연결에 실패했습니다.');
        // 폴백 데이터 사용
        setCompanyInfo({
          name: COMPANY.name.en,
          established: "2025년",
          ceo: "홍길동",
          address: "경기도 수원시 어딘가구 어딘가길 123",
          business: "IP개발, TCG, 커뮤니티, 콘텐츠 플랫폼 서비스",
          employees: "5명",
          capital: "-"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  if (loading) {
    return (
      <div className="company-info-page">
        <div className="loading-container">
          <div className="loading">회사 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (!companyInfo) {
    return (
      <div className="company-info-page">
        <div className="error-container">
          <div className="error">
            {error || '회사 정보를 불러올 수 없습니다.'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-info-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About {COMPANY.name.en}</h1>
          <p className="hero-subtitle">
            창의적인 콘텐츠와 혁신적인 기술로 
            경험을 선사하는 엔터테인먼트 회사입니다.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2025</span>
              <span className="stat-label">Founded</span>
            </div>
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Business Areas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="company-container">
        {/* Company Overview */}
        <section className="overview-section">
          <div className="section-header">
            <h2>Company Overview</h2>
            <p>로어크래프트의 기본 정보를 확인하세요</p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🏢</div>
              <h3>회사명</h3>
              <p>{companyInfo.name}</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📅</div>
              <h3>설립년도</h3>
              <p>{companyInfo.established}</p>
            </div>
            <div className="info-card">
              <div className="info-icon">👑</div>
              <h3>대표</h3>
              <p>{companyInfo.ceo}</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>본사주소</h3>
              <p>{companyInfo.address}</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💼</div>
              <h3>주요사업</h3>
              <p>{companyInfo.business}</p>
            </div>
            <div className="info-card">
              <div className="info-icon">👥</div>
              <h3>임직원수</h3>
              <p>{companyInfo.employees}</p>
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="business-section">
          <div className="section-header">
            <h2>Our Business Areas</h2>
            <p>로어크래프트가 집중하고 있는 핵심 사업 영역입니다</p>
          </div>
          <div className="business-grid">
            <div className="business-card">
              <div className="business-icon">🎮</div>
              <div className="business-header">
                <h3>TCG Development</h3>
                <span className="business-tag">Core Business</span>
              </div>
              <p>독창적인 IP를 활용한 트레이딩 카드 게임 개발 및 운영. 혁신적인 게임플레이와 매력적인 스토리텔링으로 플레이어들에게 새로운 재미를 선사합니다.</p>
              <div className="business-features">
                <span>• 게임 시스템 설계</span>
                <span>• 밸런스 조정</span>
                <span>• 콘텐츠 업데이트</span>
              </div>
            </div>
            <div className="business-card">
              <div className="business-icon">🎬</div>
              <div className="business-header">
                <h3>Media Content</h3>
                <span className="business-tag">Expansion</span>
              </div>
              <p>웹툰, 애니메이션, 영상 콘텐츠 제작 및 배급. 게임 IP를 다양한 미디어로 확장하여 더 넓은 팬층에게 다가갑니다.</p>
              <div className="business-features">
                <span>• 웹툰 제작</span>
                <span>• 애니메이션 제작</span>
                <span>• 영상 콘텐츠</span>
              </div>
            </div>
            <div className="business-card">
              <div className="business-icon">🌐</div>
              <div className="business-header">
                <h3>Community Platform</h3>
                <span className="business-tag">Service</span>
              </div>
              <p>게이머와 팬들을 위한 온라인 커뮤니티 플랫폼 운영. 사용자들이 소통하고 콘텐츠를 공유할 수 있는 공간을 제공합니다.</p>
              <div className="business-features">
                <span>• 커뮤니티 관리</span>
                <span>• 이벤트 운영</span>
                <span>• 사용자 지원</span>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="culture-section">
          <div className="section-header">
            <h2>Our Culture & Values</h2>
            <p>로어크래프트를 움직이는 핵심 가치관입니다</p>
          </div>
          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon">💡</div>
              <h3>Innovation</h3>
              <p>새로운 아이디어와 기술을 통해 게임 산업의 미래를 만들어갑니다.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🎨</div>
              <h3>Creativity</h3>
              <p>독창적인 콘텐츠와 아이디어로 플레이어들에게 특별한 경험을 선사합니다.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>팀워크와 소통을 바탕으로 더 나은 결과물을 만들어냅니다.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🚀</div>
              <h3>Growth</h3>
              <p>지속적인 학습과 발전을 통해 개인과 회사 모두의 성장을 추구합니다.</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .company-info-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: white;
        }

        .loading-container,
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: #ccc;
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
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zm0 0v20c11.046 0 20-8.954 20-20H20z'/%3E%3C/g%3E%3C/svg%3E") repeat;
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
          margin-bottom: 50px;
          opacity: 0.9;
          line-height: 1.7;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
        }

        .company-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
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

        .overview-section {
          padding: 80px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .info-card {
          background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
          border: 1px solid #333;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card:hover {
          transform: translateY(-8px);
          border-color: #667eea;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(102, 126, 234, 0.1);
        }

        .info-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
        }

        .info-card h3 {
          font-size: 1.3rem;
          margin-bottom: 16px;
          color: #667eea;
          font-weight: 700;
        }

        .info-card p {
          color: #ccc;
          line-height: 1.6;
          font-size: 1rem;
        }

        .business-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .business-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }

        .business-card {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
          border: 1px solid #444;
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
          position: relative;
        }

        .business-card:hover {
          transform: translateY(-10px);
          border-color: #667eea;
          box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(102, 126, 234, 0.15);
        }

        .business-icon {
          font-size: 4rem;
          margin-bottom: 24px;
          display: block;
        }

        .business-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .business-header h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
        }

        .business-tag {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .business-card p {
          color: #ccc;
          line-height: 1.7;
          margin-bottom: 24px;
          font-size: 1rem;
        }

        .business-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .business-features span {
          color: #999;
          font-size: 0.9rem;
          padding-left: 8px;
        }

        .culture-section {
          padding: 80px 0;
        }

        .culture-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .culture-card {
          text-align: center;
          padding: 40px 24px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 16px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          transition: all 0.3s ease;
        }

        .culture-card:hover {
          transform: translateY(-5px);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border-color: rgba(102, 126, 234, 0.4);
        }

        .culture-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
          display: block;
        }

        .culture-card h3 {
          font-size: 1.4rem;
          margin-bottom: 16px;
          font-weight: 700;
          color: #667eea;
        }

        .culture-card p {
          color: #ccc;
          line-height: 1.6;
        }


      `}</style>
    </div>
  );
}
export default CompanyInfoPage;