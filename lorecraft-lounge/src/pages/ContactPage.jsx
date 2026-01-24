import './ContactPage.css'

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>크팅에 대해 궁금한 점이 있으시면 언제든 연락주세요</p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* 연락처 정보 */}
          <div className="contact-info-section">
            <h2>연락처 정보</h2>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>이메일</h3>
                <p>contact@cting.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>주소</h3>
                <p>경기도 화성시 봉담읍 북촌길 10-4, 3동 302호</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🕐</div>
              <div className="contact-details">
                <h3>운영시간</h3>
                <p>평일 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="contact-form-section">
            <h2>문의하기</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" placeholder="이름을 입력하세요" />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" placeholder="이메일을 입력하세요" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">제목</label>
                <input type="text" id="subject" placeholder="문의 제목을 입력하세요" />
              </div>

              <div className="form-group">
                <label htmlFor="message">내용</label>
                <textarea id="message" rows="5" placeholder="문의 내용을 입력하세요"></textarea>
              </div>

              <button type="submit" className="submit-btn">문의 보내기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
