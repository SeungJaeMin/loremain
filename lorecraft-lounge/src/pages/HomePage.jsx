import { useEffect, useRef, useState } from 'react'
import './HomePage.css'

function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const sectionsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="toss-home">
      {/* Hero Section */}
      <section className="toss-hero">
        {/* 배경 이미지 */}
        <div className="toss-hero-bg">
          <img src="/cting_main_generate1.png" alt="크팅 배경" className="toss-hero-bg-image" />
        </div>
        {/* 검은색 오버레이 (20% 투명도) */}
        <div className="toss-hero-overlay"></div>
        {/* 콘텐츠 */}
        <div className="toss-hero-content">
          <span className="toss-hero-label">프리랜서 매칭 플랫폼</span>
          <h1 className="toss-hero-title">
            누구나 쉽게<br />
            <span className="toss-highlight">신뢰할 수 있는 프리랜서</span>를<br />
            만나보세요
          </h1>
          <p className="toss-hero-subtitle">
            프로젝트에 딱 맞는 전문가, 안전한 계약까지 한 번에
          </p>
          <div className="toss-hero-buttons">
            <a href="https://cting-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="toss-btn-primary">
              크팅 시작하기
            </a>
            <a href="/about" className="toss-btn-secondary toss-btn-secondary-light">더 알아보기</a>
          </div>
        </div>
      </section>

      {/* Feature 1: AI 매칭 */}
      <section className="toss-section toss-section-gray" ref={addToRefs}>
        <div className="toss-section-content">
          <div className="toss-section-text">
            <span className="toss-section-label">AI 매칭</span>
            <h2 className="toss-section-title">
              프로젝트에 딱 맞는<br />
              크리에이터를 자동으로
            </h2>
            <p className="toss-section-desc">
              자신의 프로젝트 요구사항에 맞는<br />
              프로~학생 수준까지<br />
              자동으로 검색해보세요!
            </p>
          </div>
          <div className="toss-section-image">
            <img src="/phone_center.png" alt="AI 매칭 기능" className="toss-phone-image" />
          </div>
        </div>
      </section>

      {/* Feature 2: GIG 기능 */}
      <section className="toss-section toss-section-white" ref={addToRefs}>
        <div className="toss-section-content toss-reverse">
          <div className="toss-section-text">
            <span className="toss-section-label">GIG 기능</span>
            <h2 className="toss-section-title">
              당신의 재능을<br />
              상품으로 등록하세요
            </h2>
            <p className="toss-section-desc">
              자신이 할 수 있는 작업을<br />
              상품처럼 등록하고, 거래하세요!
            </p>
          </div>
          <div className="toss-section-image">
            <img src="/Gig_1.png" alt="GIG 기능" className="toss-phone-image" />
          </div>
        </div>
      </section>

      {/* Feature 3: 에스크로 */}
      <section className="toss-section toss-section-blue" ref={addToRefs}>
        <div className="toss-section-content">
          <div className="toss-section-text toss-text-white">
            <span className="toss-section-label toss-label-white">에스크로</span>
            <h2 className="toss-section-title">
              안전한 거래,<br />
              믿을 수 있는 대금
            </h2>
            <p className="toss-section-desc">
              에스크로를 통해<br />
              안전하게 커미션 대금을 받으세요!
            </p>
          </div>
          <div className="toss-section-image">
            <div className="toss-escrow-card">
              <div className="toss-escrow-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <p className="toss-escrow-text">대금 보호 중</p>
              <p className="toss-escrow-amount">₩1,500,000,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: 대시보드 */}
      <section className="toss-section toss-section-dark" ref={addToRefs}>
        <div className="toss-section-content toss-reverse">
          <div className="toss-section-text toss-text-white">
            <span className="toss-section-label toss-label-white">계약 대시보드</span>
            <h2 className="toss-section-title">
              모든 프리랜서 계약을<br />
              한눈에 관리
            </h2>
            <p className="toss-section-desc">
              프리랜서 계약을 플랫폼을 통해<br />
              체계적으로 관리하세요!
            </p>
          </div>
          <div className="toss-section-image toss-dashboard-images">
            <img src="/dash_1.png" alt="대시보드 1" className="toss-dash-image" />
            <img src="/dash_2.png" alt="대시보드 2" className="toss-dash-image" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="toss-cta" ref={addToRefs}>
        <h2 className="toss-cta-title">
          지금 바로 크팅을<br />
          시작해보세요
        </h2>
        <p className="toss-cta-desc">
          프리랜서도, 클라이언트도 모두 환영합니다
        </p>
        <a href="https://cting-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="toss-btn-primary toss-btn-large">
          무료로 시작하기
        </a>
      </section>
    </div>
  )
}

export default HomePage
