import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <div className="header-logo">
          <Link to="/" className="logo">
            LORECRAFT
          </Link>
        </div>

        {/* 중앙 네비게이션 메뉴 */}
        <nav className="header-nav">
          <Link to="/company/info" className="nav-link">INFO</Link>
          <Link to="/company/vision" className="nav-link">VISION</Link>
          <Link to="/news" className="nav-link">NEWS</Link>
          <Link to="/events" className="nav-link">EVENT</Link>
          <Link to="/irbook" className="nav-link">IRBook</Link>
          <Link to="/officialsite" className="nav-link">OFFICIAL SITE</Link>
        </nav>

        {/* 빈 공간 (레이아웃 균형을 위해) */}
        <div className="header-spacer"></div>
      </div>
    </header>
  )
}

export default Header