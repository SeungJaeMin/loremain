import { useEffect, useRef } from 'react'
import './AboutPage.css'

function AboutPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('.about-slide')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 }
    )

    sections?.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page" ref={containerRef}>
      {/* Slide 1: Hero */}
      <section className="about-slide about-slide-hero">
        <div className="slide-content">
          <span className="slide-label">About Us</span>
          <h1>
            프리랜서와 클라이언트를<br />
            연결하는 새로운 방법
          </h1>
          <p className="slide-desc">크팅미디어</p>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Slide 2: Mission */}
      <section className="about-slide about-slide-white">
        <div className="slide-content">
          <span className="slide-label">Our Mission</span>
          <h2>
            누구나 쉽게<br />
            재능을 거래할 수 있도록
          </h2>
          <p className="slide-desc-large">
            크팅은 프리랜서와 클라이언트 사이의 장벽을 허물고,<br />
            AI 기술을 통해 최적의 매칭을 제공합니다.
          </p>
        </div>
      </section>

      {/* Slide 3: Values */}
      <section className="about-slide about-slide-gray">
        <div className="slide-content slide-content-wide">
          <span className="slide-label">Our Values</span>
          <h2>크팅이 추구하는 가치</h2>
          <div className="values-row">
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>신뢰</h3>
              <p>안전한 거래 환경</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>정확성</h3>
              <p>AI 기반 매칭</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💡</div>
              <h3>혁신</h3>
              <p>새로운 기준</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>성장</h3>
              <p>함께하는 성장</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Company Info */}
      <section className="about-slide about-slide-dark">
        <div className="slide-content">
          <span className="slide-label slide-label-light">Company</span>
          <h2>크팅미디어</h2>
          <div className="company-stats">
            <div className="stat-box">
              <span className="stat-value">2025.09</span>
              <span className="stat-name">설립</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">경기도 화성시</span>
              <span className="stat-name">본사 위치</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">손형직</span>
              <span className="stat-name">대표</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: CTA */}
      <section className="about-slide about-slide-blue">
        <div className="slide-content">
          <h2>크팅과 함께<br />시작하세요</h2>
          <p className="slide-desc-large">프리랜서도, 클라이언트도 모두 환영합니다</p>
          <a href="https://cting-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="slide-cta-btn">
            크팅 시작하기
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
