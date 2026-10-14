import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            ✦ YOUR CAMPUS. YOUR TALENT. YOUR STAGE.
          </span>

          <h1>
            There is more to you.
            <br />
            <span>Let it be seen.</span>
          </h1>

          <p className="hero-description">
            Your next collaboration, your next opportunity, your next big
            moment could start right here. Discover talent, meet your people,
            and make campus life count.
          </p>

          <div className="hero-buttons">
            <Link to="/discover" className="btn btn-primary">
              Discover Talents <span>↗</span>
            </Link>

            <Link to="/events" className="btn btn-secondary">
              Explore Events <span>→</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="note-dot"></span>
            One campus. A thousand ways to shine.
          </div>

          <div className="hero-stats">
            <div>
              <strong>01</strong>
              <span>Find your people</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Explore your interests</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Make your mark</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-label="Campus talent highlights">
          <div className="art-circle circle-one"></div>
          <div className="art-circle circle-two"></div>

          <div className="art-card art-card-main">
            <span className="art-label">THE CAMPUS SPOTLIGHT · 001</span>

            <div className="art-mic">✳</div>

            <span className="spotlight-caption">A SPACE TO BE YOU</span>

            <h2>
              Your thing.
              <br />
              Your people.
              <br />
              <span>Your stage.</span>
            </h2>

            <p>Every skill has a story worth sharing.</p>

            <div className="art-tags">
              <span>Music</span>
              <span>Dance</span>
              <span>Design</span>
              <span>Ideas</span>
            </div>
          </div>

          <div className="floating-card floating-top">
            <span className="floating-icon">✦</span>
            <div>
              <strong>Something starts here.</strong>
              <small>Your next opportunity awaits.</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <span className="floating-emoji">↗</span>
            <div>
              <strong>Find your next event</strong>
              <small>Discover what is happening on campus.</small>
            </div>
          </div>

          <span className="hero-side-note">MADE FOR THE MULTITALENTED.</span>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span className="section-eyebrow">MORE THAN A COLLEGE PLATFORM</span>
          <h2>
            Your interests deserve
            <br />
            <span>a little more space.</span>
          </h2>
          <p>
            Whether you are finding your voice or looking for your next
            collaboration, there is room for you here.
          </p>
        </div>

        <div className="features">
          <article className="card">
            <div className="feature-topline">
              <div className="feature-icon">✳</div>
              <span className="feature-number">01 / YOUR SPACE</span>
            </div>
            <h3>Make yourself known.</h3>
            <p>
              Build a profile around your skills, interests and achievements.
              You are more than your department or your grades.
            </p>
            <Link to="/profile" className="feature-link">
              Build your profile <span>↗</span>
            </Link>
          </article>

          <article className="card">
            <div className="feature-topline">
              <div className="feature-icon">⌕</div>
              <span className="feature-number">02 / YOUR PEOPLE</span>
            </div>
            <h3>Find your kind of people.</h3>
            <p>
              Discover students with shared interests, different skills and
              ideas that could turn into something amazing.
            </p>
            <Link to="/discover" className="feature-link">
              Discover talent <span>↗</span>
            </Link>
          </article>

          <article className="card">
            <div className="feature-topline">
              <div className="feature-icon">↗</div>
              <span className="feature-number">03 / YOUR NEXT STEP</span>
            </div>
            <h3>Say yes to something new.</h3>
            <p>
              Find cultural events, competitions, hackathons and opportunities
              to try something beyond your everyday routine.
            </p>
            <Link to="/events" className="feature-link">
              Explore events <span>↗</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="section-eyebrow">THIS IS YOUR SIGN</span>
          <h2>You do not need to have it all figured out.</h2>
          <p>
            Start with what you love. See where it takes you.
          </p>
        </div>

        <Link to="/register" className="btn btn-light">
          Find your stage <span>↗</span>
        </Link>
      </section>

      <footer className="home-footer">
        <Link to="/" className="footer-brand">
          STAGE<span>.</span>
        </Link>
        <p>For every interest, every idea, and every version of you.</p>
        <Link to="/events" className="footer-link">
          Find something happening <span>↗</span>
        </Link>
      </footer>
    </main>
  );
}

export default Home;