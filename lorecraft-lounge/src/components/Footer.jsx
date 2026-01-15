import { Link } from 'react-router-dom'
import { useState } from 'react'
import { COMPANY, CONTACT, URLS } from '../constants/textResources'

function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    try {
      // TODO: 실제 API 호출로 변경
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        alert('관리자 로그인 성공!')
        window.location.href = '/admin'
      } else {
        setLoginError('아이디 또는 비밀번호가 잘못되었습니다.')
      }
    } catch (error) {
      setLoginError('로그인 중 오류가 발생했습니다.')
    }
  }
  const footerData = {
    company: {
      name: COMPANY.name.en,
      description: COMPANY.description.ko,
      established: "2025년",
      ceo: "홍길동"
    },
    contact: {
      address: "경기도 수원시 어딘가구 어딘가길 123",
      email: CONTACT.email,
      phone: "031-1234-5678",
      fax: "031-1234-5679"
    },
    business: {
      registration: "123-45-67890",
      license: "제2025-경기수원-0123호",
      privacy: "김개인정보",
      ir: CONTACT.ir
    },
    links: {
      company: [
        { name: "회사소개", path: "/company/info" },
        { name: "회사비전", path: "/company/vision" },
        { name: "사업영역", path: "/company/info#business" }
      ],
      service: [
        { name: "TCG Estela", url: "https://tcg-estela.example.com" },
        { name: "커뮤니티", url: URLS.community },
        { name: "공식스토어", url: URLS.store }
      ],
      support: [
        { name: "뉴스", path: "/news" },
        { name: "이벤트", path: "/events" },
        { name: "IRBook", path: "/irbook" },
        { name: "문의하기", path: "/contact" }
      ],
      social: [
        { name: "YouTube", url: URLS.social.youtube, icon: "📺" },
        { name: "Instagram", url: URLS.social.instagram, icon: "📷" },
        { name: "Discord", url: URLS.social.discord, icon: "💬" },
        { name: "Twitter", url: URLS.social.twitter, icon: "🐦" }
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
            <button 
              className="admin-login-btn"
              onClick={() => setShowAdminLogin(true)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#666', 
                fontSize: '12px', 
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              관리자
            </button>
          </div>
        </div>

        {/* 관리자 로그인 팝업 */}
        {showAdminLogin && (
          <div className="admin-login-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="admin-login-popup" style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              width: '300px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
              <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>관리자 로그인</h3>
              <form onSubmit={handleAdminLogin}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>아이디</label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>비밀번호</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                {loginError && (
                  <div style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
                    {loginError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    로그인
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false)
                      setLoginError('')
                      setLoginForm({ username: '', password: '' })
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer