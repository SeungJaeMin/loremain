import { Link } from 'react-router-dom'

function Header({ user, isAdmin, onMenuClick }) {
  
  const handleLogin = () => {
    // 임시 로그인 (나중에 Firebase Auth로 교체)
    console.log("로그인 클릭");
  };

  const handleLogout = () => {
    // 임시 로그아웃
    console.log("로그아웃 클릭");
  };

  return (
    <header className="header">
      <div className="header-container">
        
        {/* 로고 및 메뉴 버튼 */}
        <div className="header-left">
          <button className="menu-button" onClick={onMenuClick}>
            ☰
          </button>
          <Link to="/" className="logo">
            🏢 Lorecraft Lounge
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="header-nav">
          <Link to="/company/info" className="nav-link">회사소개</Link>
          <Link to="/news" className="nav-link">뉴스</Link>
          <Link to="/events" className="nav-link">이벤트</Link>
          <Link to="/irbook" className="nav-link">IRBook</Link>
        </nav>

        {/* 사용자 정보 및 로그인 */}
        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <span className="user-name">
                {isAdmin && '👑'} {user.name || user.email}
              </span>
              {isAdmin && (
                <Link to="/admin" className="admin-link">
                  관리자
                </Link>
              )}
              <button onClick={handleLogout} className="logout-button">
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header