import { Link } from 'react-router-dom'

function Footer() {
  const footerData = {
    company: {
      name: "LORECRAFT",
      description: "We craft lore and adventures for everyone.",
      established: "2025년",
      ceo: "손형직"
    },
    contact: {
      address: "경기도 수원시 어딘가구 어딘가길 123",
      email: "contact@lorecraft.co.kr",
      phone: "031-1234-5678",
      fax: "031-1234-5679"
    },
    business: {
      registration: "123-45-67890",
      license: "제2025-경기수원-0123호",
      privacy: "김개인정보",
      ir: "ir@lorecraft.co.kr"
    },
    links: {
      company: [
        { name: "회사소개", path: "/company/info" },
        { name: "회사비전", path: "/company/vision" },
        { name: "사업영역", path: "/company/info#business" }
      ],
      service: [
        { name: "TCG Estela", url: "https://tcg-estela.example.com" },
        { name: "커뮤니티", url: "https://community.lorecraft.co.kr" },
        { name: "공식스토어", url: "https://store.lorecraft.co.kr" }
      ],
      support: [
        { name: "뉴스", path: "/news" },
        { name: "이벤트", path: "/events" },
        { name: "IRBook", path: "/irbook" },
        { name: "문의하기", path: "/contact" }
      ],
      social: [
        { name: "YouTube", url: "https://youtube.com/@lorecraft", icon: "📺" },
        { name: "Instagram", url: "https://instagram.com/lorecraft_official", icon: "📷" },
        { name: "Discord", url: "https://discord.gg/lorecraft", icon: "💬" },
        { name: "Twitter", url: "https://twitter.com/lorecraft_kr", icon: "🐦" }
      ]
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 상단 영역 */}
        <div className="footer-top">
          {/* 회사 정보 */}
          <div className="footer-section footer-company">
            <div className="footer-logo">
              <h3>{footerData.company.name}</h3>
              <p className="footer-description">
                {footerData.company.description}
              </p>
            </div>
            <div className="footer-contact">
              <div className="contact-item">
                <strong>주소</strong>
                <span>{footerData.contact.address}</span>
              </div>
              <div className="contact-item">
                <strong>이메일</strong>
                <span>{footerData.contact.email}</span>
              </div>
              <div className="contact-item">
                <strong>전화</strong>
                <span>{footerData.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* 링크 섹션들 */}
          <div className="footer-links">
            {/* 회사 */}
            <div className="footer-section">
              <h4>회사</h4>
              <ul>
                {footerData.links.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 서비스 */}
            <div className="footer-section">
              <h4>서비스</h4>
              <ul>
                {footerData.links.service.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 지원 */}
            <div className="footer-section">
              <h4>지원</h4>
              <ul>
                {footerData.links.support.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 소셜 미디어 */}
            <div className="footer-section">
              <h4>소셜 미디어</h4>
              <div className="social-links">
                {footerData.links.social.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.name}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="legal-info">
              <span>사업자등록번호: {footerData.business.registration}</span>
              <span>통신판매업신고: {footerData.business.license}</span>
              <span>개인정보보호책임자: {footerData.business.privacy}</span>
            </div>
            <div className="legal-links">
              <Link to="/privacy">개인정보처리방침</Link>
              <Link to="/terms">이용약관</Link>
              <a href={`mailto:${footerData.business.ir}`}>투자자문의</a>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 {footerData.company.name} All rights reserved.</p>
            <p className="footer-disclaimer">
              본 사이트의 모든 콘텐츠는 저작권법에 의해 보호받습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer