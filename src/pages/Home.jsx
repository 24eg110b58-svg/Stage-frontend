import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to STAGE</h1>

      <p>
        Connect student talent with campus opportunities.
      </p>

      <div className="hero-buttons">
        <Link to="/discover">
          <button>Discover Talents</button>
        </Link>

        <Link to="/events">
          <button>Browse Events</button>
        </Link>
      </div>

      <div className="features">
        <div className="card">
          <h3>🎤 Showcase Talent</h3>
          <p>Display your skills, achievements and interests.</p>
        </div>

        <div className="card">
          <h3>🔎 Discover Students</h3>
          <p>Find talented students across departments.</p>
        </div>

        <div className="card">
          <h3>📅 Campus Events</h3>
          <p>Participate in competitions and activities.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;