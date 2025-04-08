import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Background sits behind everything */}
      <div className="hero-background" />

      {/* Everything else is layered on top */}
      <header className="hero-header">
        <div className="logo">
          <img src="/logo.png" alt="CineNiche Logo" />
        </div>
        <nav className="nav">
          <a href="/login">Login</a>
        </nav>
      </header>

      <div className="hero-text">
        <h1>Discover the Unseen.</h1>
        <p>
          Cult classics, global cinema, and rare documentaries—all in one place.
        </p>
        <a href="/login" className="cta-button">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
