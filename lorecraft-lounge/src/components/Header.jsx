import { Link } from 'react-router-dom'
import { COMPANY } from '../constants/textResources'
import { useLanguage } from '../contexts/LanguageContext'

function Header() {
  const { lang, setLang } = useLanguage()

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src="/logo_main.png" alt={COMPANY.name[lang]} className="logo-image" />
          </Link>
        </div>
        
        <div className="nav-container">
          <nav className="header-nav">
            <Link to="/company/info" className="nav-link">INFO</Link>
            <Link to="/company/vision" className="nav-link">VISION</Link>
            <Link to="/news" className="nav-link">NEWS</Link>
            <div className="nav-link nav-dropdown">
              OFFICIAL SITE
              <div className="dropdown-menu">
                <a href="https://cting-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  크팅플랫폼
                </a>
                <a href="https://tcg-lounge.example.com" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  TCG Lounge
                </a>
                <a href="https://official-store.example.com" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  OFFICIAL STORE
                </a>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="actions-container">
          <div className="lang-dropdown">
            <span className="lang-current">{lang.toUpperCase()}</span>
            <div className="lang-dropdown-menu">
              <button onClick={() => setLang('ko')}>KO 한국어</button>
              <button onClick={() => setLang('en')}>EN English</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
