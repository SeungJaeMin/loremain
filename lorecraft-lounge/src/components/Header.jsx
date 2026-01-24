import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../constants/textResources'
import { useLanguage } from '../contexts/LanguageContext'

function Header() {
  const { lang, setLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src="/logo_main.png" alt={COMPANY.name[lang]} className="logo-image" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="nav-container">
          <nav className="header-nav">
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
            <div className="nav-link nav-dropdown">
              Official Site
              <div className="dropdown-menu">
                <a href="https://cting-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  크팅플랫폼
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

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="메뉴 열기"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link to="/news" className="mobile-nav-link" onClick={closeMobileMenu}>
            News
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
            Contact Us
          </Link>
          <div className="mobile-nav-divider"></div>
          <a
            href="https://cting-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            크팅플랫폼
          </a>
        </nav>

        <div className="mobile-lang-selector">
          <button
            className={lang === 'ko' ? 'active' : ''}
            onClick={() => { setLang('ko'); closeMobileMenu(); }}
          >
            KO 한국어
          </button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => { setLang('en'); closeMobileMenu(); }}
          >
            EN English
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
