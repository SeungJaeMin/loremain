import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo">
            LORECRAFT
          </Link>
        </div>
        <nav className="header-nav">
          <Link to="/company/info" className="nav-link">INFO</Link>
          <Link to="/company/vision" className="nav-link">VISION</Link>
          <Link to="/news" className="nav-link">NEWS</Link>
          <Link to="/events" className="nav-link">EVENT</Link>
          <Link to="/recruit" className="nav-link">RECRUIT</Link>
          {/* <Link to="/irbook" className="nav-link">IRBook</Link> */}
          <div className="nav-link nav-dropdown">
            OFFICIAL SITE
            <div className="dropdown-menu">
              <a href="https://tcg-lounge.example.com" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                TCG Lounge
              </a>
              <a href="https://official-store.example.com" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                OFFICIAL STORE
              </a>
            </div>
          </div>
        </nav>
        <div className="header-spacer"></div>
      </div>
    </header>
  )
}

export default Header