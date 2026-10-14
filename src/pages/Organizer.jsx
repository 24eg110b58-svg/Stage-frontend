
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import "./Organizer.css";

function Organizer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="organizer-page">
      <section className="organizer-hero">
        <span className="organizer-eyebrow">
          STAGE / ORGANIZER SPACE
        </span>

        <h1>
          Make something
          <br />
          <span>happen on campus.</span>
        </h1>

        <p>
          Your ideas bring people together. Create events, share
          opportunities and give students a reason to show up.
        </p>

        <Link to="/add-event" className="organizer-create-button">
          <span>＋</span> Create a new event
        </Link>
      </section>

      <section className="organizer-content">
        <div className="organizer-welcome">
          <div className="organizer-avatar">O</div>
          <div>
            <span className="organizer-eyebrow">YOUR WORKSPACE</span>
            <h2>Campus Organizer</h2>
            <p>Event planning and campus opportunities</p>
          </div>
        </div>

        <div className="organizer-stats">
          <article className="organizer-stat">
            <span>Total events</span>
            <strong>{loading ? "—" : events.length}</strong>
            <small>Events on STAGE</small>
          </article>

          <article className="organizer-stat">
            <span>Your tools</span>
            <strong>01</strong>
            <small>Event publishing</small>
          </article>
        </div>

        <div className="organizer-events-heading">
          <div>
            <span className="organizer-eyebrow">EVENT MANAGEMENT</span>
            <h2>Campus events</h2>
          </div>

          <Link to="/add-event" className="organizer-secondary-button">
            + Add event
          </Link>
        </div>

        {loading ? (
          <div className="organizer-empty">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="organizer-empty">
            <span className="organizer-empty-icon">✳</span>
            <h3>Your first event starts here.</h3>
            <p>
              Create an event to share it with students on the STAGE
              Events page.
            </p>
            <Link to="/add-event" className="organizer-secondary-button">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="organizer-event-list">
            {events.map((event) => (
              <article className="organizer-event-row" key={event.id}>
                <div className="organizer-event-symbol">✦</div>
                <div className="organizer-event-info">
                  <h3>{event.title}</h3>
                  <p>
                    {event.category || "Campus"} ·{" "}
                    {event.date || "Date to be announced"}
                  </p>
                  <small>
                    {event.venue || "Venue to be announced"}
                  </small>
                </div>
                <span className="organizer-event-status">Published</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Organizer;
