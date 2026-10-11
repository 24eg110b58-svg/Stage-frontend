import { Link } from "react-router-dom";

function Home() {
return ( <main className="home-page"> <section className="hero"> <div className="hero-content"> <span className="hero-badge">
✦ YOUR CAMPUS. YOUR TALENT. YOUR STAGE. </span>
      <h1>
        Your talent deserves
        <br />
        <span>the spotlight.</span>
      </h1>

      <p className="hero-description">
        Discover your strengths, connect with talented students,
        and find exciting opportunities to shine on campus.
      </p>

      <div className="hero-buttons">
        <Link to="/discover" className="btn btn-primary">
          Discover Talents <span>↗</span>
        </Link>

        <Link to="/events" className="btn btn-secondary">
          Explore Events
        </Link>
      </div>

      <div className="hero-note">
        <span className="note-dot"></span>
        Made for students. Powered by talent.
      </div>
    </div>

    <div className="hero-art" aria-label="Campus talent highlights">
      <div className="art-circle circle-one"></div>
      <div className="art-circle circle-two"></div>

      <div className="art-card art-card-main">
        <span className="art-label">THE CAMPUS SPOTLIGHT</span>
        <div className="art-mic">🎤</div>
        <h2>Show the world<br />what you can do.</h2>
        <p>Every skill has a stage.</p>
        <div className="art-tags">
          <span>Music</span>
          <span>Dance</span>
          <span>Design</span>
        </div>
      </div>

      <div className="floating-card floating-top">
        <span className="floating-icon">✦</span>
        <div>
          <strong>Your moment.</strong>
          <small>Your opportunity.</small>
        </div>
      </div>

      <div className="floating-card floating-bottom">
        <span className="floating-emoji">📅</span>
        <div>
          <strong>Find your next event</strong>
          <small>Explore campus opportunities</small>
        </div>
      </div>
    </div>
  </section>

  <section className="features-section">
    <div className="section-heading">
      <span className="section-eyebrow">WHAT YOU CAN DO</span>
      <h2>There's a place for your talent.</h2>
      <p>From discovering new skills to stepping onto the stage, start here.</p>
    </div>

    <div className="features">
      <article className="card">
        <div className="feature-icon">🎤</div>
        <span className="feature-number">01 / SHOWCASE</span>
        <h3>Showcase Your Talent</h3>
        <p>
          Share your skills, achievements and interests.
          Let your campus see what makes you unique.
        </p>
        <Link to="/profile" className="feature-link">
          Build your profile <span>→</span>
        </Link>
      </article>

      <article className="card">
        <div className="feature-icon">🔎</div>
        <span className="feature-number">02 / DISCOVER</span>
        <h3>Meet Your People</h3>
        <p>
          Find talented students across departments
          and discover people who share your interests.
        </p>
        <Link to="/discover" className="feature-link">
          Discover students <span>→</span>
        </Link>
      </article>

      <article className="card">
        <div className="feature-icon">📅</div>
        <span className="feature-number">03 / PARTICIPATE</span>
        <h3>Find Campus Events</h3>
        <p>
          Explore competitions, cultural festivals,
          hackathons and exciting campus activities.
        </p>
        <Link to="/events" className="feature-link">
          Browse events <span>→</span>
        </Link>
      </article>
    </div>
  </section>

  <section className="home-cta">
    <div>
      <span className="section-eyebrow">YOUR JOURNEY STARTS HERE</span>
      <h2>Ready to take the stage?</h2>
      <p>Create your student profile and start exploring opportunities.</p>
    </div>
    <Link to="/register" className="btn btn-light">
      Join STAGE <span>↗</span>
    </Link>
  </section>

  <footer className="home-footer">
    <span className="footer-brand">STAGE<span>.</span></span>
    <p>Discover talent. Create opportunities. Make your mark.</p>
  </footer>
</main>

);
}

export default Home;
