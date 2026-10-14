import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventService";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load events.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categories = [
    "All",
    ...new Set(
      events.map((event) => event.category).filter(Boolean)
    ),
  ];

  const visibleEvents = events.filter((event) => {
    const matchesCategory =
      category === "All" || event.category === category;

    const query = search.toLowerCase().trim();

    const matchesSearch = [
      event.title,
      event.description,
      event.category,
      event.venue,
      event.organizer,
    ].some((value) =>
      String(value || "").toLowerCase().includes(query)
    );

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="stage-events">
      <section className="events-hero">
        <div className="events-hero-content">
          <span className="events-eyebrow">
            ✳ YOUR CAMPUS, YOUR MOMENT
          </span>

          <h1>
            Find your next
            <br />
            <span>thing to love.</span>
          </h1>

          <p>
            From cultural nights to big ideas, discover events,
            meet your people, and make your campus experience yours.
          </p>

          <a href="#event-list" className="events-hero-link">
            Explore what's happening <span>↘</span>
          </a>
        </div>

        <div className="events-hero-art" aria-hidden="true">
          <span className="events-art-orbit orbit-one"></span>
          <span className="events-art-orbit orbit-two"></span>

          <div className="events-art-center">
            <span>STAGE PRESENTS</span>
            <strong>
              YOUR NEXT
              <br />
              BIG MOMENT.
            </strong>
            <div className="events-art-star">✳</div>
          </div>

          <span className="events-art-caption">
            SHOW UP. JOIN IN. SHINE.
          </span>
        </div>
      </section>

      <section className="events-explore" id="event-list">
        <div className="events-section-heading">
          <div>
            <span className="events-section-label">
              THE CAMPUS CALENDAR
            </span>
            <h2>Something is happening.</h2>
            <p>Find an event that feels like you.</p>
          </div>

          <span className="events-count">
            {loading ? "Loading..." : `${visibleEvents.length} events`}
          </span>
        </div>

        <div className="events-controls">
          <label className="events-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              placeholder="Search events, venues, interests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
            />

            {search && (
              <button
                type="button"
                className="events-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>

        <div className="events-categories" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`events-filter ${
                category === item ? "selected" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item === "All" ? "All events" : item}
            </button>
          ))}
        </div>

        {loading && (
          <div className="events-status">
            <span className="events-loader"></span>
            <h3>Finding your next campus moment...</h3>
            <p>Just a second while we load the events.</p>
          </div>
        )}

        {!loading && error && (
          <div className="events-status events-error" role="alert">
            <span className="events-status-icon">!</span>
            <h3>We couldn't load the events.</h3>
            <p>{error}</p>

            <button
              type="button"
              className="events-reset-button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="events-status">
            <span className="events-status-icon">✳</span>
            <h3>The stage is waiting.</h3>
            <p>
              There aren't any events yet. Once an organizer adds one,
              it will appear here.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          events.length > 0 &&
          visibleEvents.length === 0 && (
            <div className="events-status">
              <span className="events-status-icon">⌕</span>
              <h3>No events found.</h3>
              <p>Try another search or choose a different category.</p>

              <button
                type="button"
                className="events-reset-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

        {!loading && !error && visibleEvents.length > 0 && (
          <div className="stage-events-grid">
            {visibleEvents.map((event, index) => (
              <article className="stage-event-card" key={event.id}>
                <div className={`stage-event-art event-art-${index % 4}`}>
                  <span className="stage-event-number">
                    EVENT / {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="stage-event-symbol" aria-hidden="true">
                    {event.category?.toLowerCase().includes("music")
                      ? "♫"
                      : event.category?.toLowerCase().includes("tech")
                      ? "⌘"
                      : event.category?.toLowerCase().includes("dance")
                      ? "✳"
                      : "✦"}
                  </span>

                  <span className="stage-event-art-title">
                    {event.category || "CAMPUS LIFE"}
                  </span>
                </div>

                <div className="stage-event-body">
                  <span className="stage-event-category">
                    {event.category || "Campus"}
                  </span>

                  <h3>{event.title || "Campus event"}</h3>

                  <p className="stage-event-description">
                    {event.description ||
                      "A new opportunity to get involved on campus."}
                  </p>

                  <div className="stage-event-details">
                    <p>
                      <span aria-hidden="true">▦</span>
                      <span>
                        <strong>Date &amp; time</strong>
                        {event.date || "To be announced"}
                        {event.time ? ` · ${event.time}` : ""}
                      </span>
                    </p>

                    <p>
                      <span aria-hidden="true">⌖</span>
                      <span>
                        <strong>Location</strong>
                        {event.venue || "Venue to be announced"}
                      </span>
                    </p>
                  </div>

                  <div className="stage-event-footer">
                    <span className="stage-event-organizer">
                      By {event.organizer || "Campus organizer"}
                    </span>

                    <span className="stage-event-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>

                  <div className="event-registration">
                    <Link
                      to={`/events/${event.id}/register`}
                      className="event-register-button"
                    >
                      Register for event <span>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="events-bottom-note">
          <span>✳</span> Your next favourite campus memory could start here.
        </p>
      </section>
    </main>
  );
}

export default Events;
