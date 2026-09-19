import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Next-Gen Competitive Programming</span>
        </div>

        <h1>
          Master Competitive<br />
          Programming with<br />
          <span className="purple-gradient">AI Intelligence</span>
        </h1>

        <p>
          CodeForge AI combines competitive programming, personalized learning,
          and artificial intelligence to help you level up your coding skills efficiently.
        </p>
      </div>

      <div className="hero-image">
        <img src="/images/Frame 9.svg" alt="CodeForge AI Platform Preview" />
      </div>
    </section>
  );
}

export default HeroSection;
