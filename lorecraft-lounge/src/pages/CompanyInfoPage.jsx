function CompanyInfoPage() {
  const companyInfo = {
    name: "LORECRAFT",
    established: "2025년",
    ceo: "손형직",
    address: "경기도 수원시 어딘가구 어딘가길 123",
    business: "IP개발, TCG, 커뮤니티, 콘텐츠 플랫폼 서비스",
    employees: "5명",
    capital: "-"
  };

  return (
    <div className="company-info-page">
      <div className="page-container">
        <header className="page-header">
          <h1>회사소개</h1>
          <p>창의적인 콘텐츠와 혁신적인 기술로 새로운 엔터테인먼트 경험을 선사하는 로어크래프트를 소개합니다.</p>
        </header>

        <section className="company-overview">
          <div className="info-grid">
            <div className="info-card">
              <h3>회사명</h3>
              <p>{companyInfo.name}</p>
            </div>
            <div className="info-card">
              <h3>설립년도</h3>
              <p>{companyInfo.established}</p>
            </div>
            <div className="info-card">
              <h3>대표</h3>
              <p>{companyInfo.ceo}</p>
            </div>
            <div className="info-card">
              <h3>본사주소</h3>
              <p>{companyInfo.address}</p>
            </div>
            <div className="info-card">
              <h3>주요사업</h3>
              <p>{companyInfo.business}</p>
            </div>
            <div className="info-card">
              <h3>임직원수</h3>
              <p>{companyInfo.employees}</p>
            </div>
          </div>
        </section>

        <section className="business-areas">
          <h2>주요 사업영역</h2>
          <div className="business-grid">
            <div className="business-card">
              <h4>TCG</h4>
              <p>독창적인 IP를 활용한 트레이딩 카드 게임 개발 및 운영</p>
            </div>
            <div className="business-card">
              <h4>미디어 콘텐츠</h4>
              <p>웹툰, 애니메이션, 영상 콘텐츠 제작 및 배급</p>
            </div>
            <div className="business-card">
              <h4>커뮤니티 운영</h4>
              <p>게이머와 팬들을 위한 온라인 커뮤니티 플랫폼 운영</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default CompanyInfoPage;