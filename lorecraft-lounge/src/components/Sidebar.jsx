import { Link, useLocation } from 'react-router-dom'

function Sidebar({ isAdmin, isOpen, onClose }) {
  const location = useLocation();

  // 현재 경로와 일치하는지 체크
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* 모바일에서 사이드바 열렸을 때 배경 오버레이 */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          
          {/* 일반 사용자 메뉴 */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">📋 메인 메뉴</h3>
            <nav className="sidebar-nav">
              <Link 
                to="/" 
                className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
                onClick={onClose}
              >
                🏠 홈
              </Link>
              <Link 
                to="/company/info" 
                className={`sidebar-link ${isActive('/company/info') ? 'active' : ''}`}
                onClick={onClose}
              >
                🏢 회사 정보
              </Link>
              <Link 
                to="/company/vision" 
                className={`sidebar-link ${isActive('/company/vision') ? 'active' : ''}`}
                onClick={onClose}
              >
                🎯 회사 비전
              </Link>
              <Link 
                to="/news" 
                className={`sidebar-link ${isActive('/news') ? 'active' : ''}`}
                onClick={onClose}
              >
                📰 뉴스
              </Link>
              <Link 
                to="/events" 
                className={`sidebar-link ${isActive('/events') ? 'active' : ''}`}
                onClick={onClose}
              >
                🎉 이벤트
              </Link>
              <Link 
                to="/irbook" 
                className={`sidebar-link ${isActive('/irbook') ? 'active' : ''}`}
                onClick={onClose}
              >
                📊 IRBook
              </Link>
            </nav>
          </div>

          {/* 관리자 메뉴 */}
          {isAdmin && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">👑 관리자 메뉴</h3>
              <nav className="sidebar-nav">
                <Link 
                  to="/admin" 
                  className={`sidebar-link ${isActive('/admin') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  📊 대시보드
                </Link>
                <Link 
                  to="/admin/company/info" 
                  className={`sidebar-link ${isActive('/admin/company/info') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  📝 회사정보 관리
                </Link>
                <Link 
                  to="/admin/company/vision" 
                  className={`sidebar-link ${isActive('/admin/company/vision') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  📝 회사비전 관리
                </Link>
                <Link 
                  to="/admin/news" 
                  className={`sidebar-link ${isActive('/admin/news') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  📰 뉴스 관리
                </Link>
              </nav>
            </div>
          )}

        </div>
      </aside>
    </>
  )
}

export default Sidebar