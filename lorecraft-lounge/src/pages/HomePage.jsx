function HomePage() {
  return (
    <div className="home-page">
      <section className="video-section">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/LgoyDPMuEBs?autoplay=1&mute=1&loop=1&playlist=LgoyDPMuEBs&controls=0&disablekb=1&modestbranding=1&showinfo=0&start=13"
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100%",
              pointerEvents: "none",
              objectFit: "cover"
            }}
            tabIndex={-1}
          />
                    <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
          <div
            className="video-overlay"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 2,
              color: "white",
              textAlign: "center"
            }}
          ></div>
          <div className="video-overlay">
            <h1 className="company-title">LORECRAFT</h1>
            <p className="company-subtitle">
              IP를 이용한 TCG, 미디어 콘텐츠, 커뮤니티를 운영하는 기업
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage