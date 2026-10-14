
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEvents, registerForEvent } from "../services/eventService";
import "./EventRegistration.css";

function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("stageStudent");
      setStudent(savedStudent ? JSON.parse(savedStudent) : null);
    } catch {
      setStudent(null);
    }

    async function loadEvent() {
      try {
        const events = await getEvents();
        const selectedEvent = events.find(
          (item) => String(item.id) === String(eventId)
        );
        setEvent(selectedEvent || null);
      } catch {
        setError("We couldn't load this event. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!student) {
      setError("Please log in to your student account before registering.");
      return;
    }

    if (!confirmed) {
      setError("Please confirm your registration details.");
      return;
    }

    const studentId = student.id ?? student.studentId;

    if (studentId == null) {
      setError(
        "Your student account ID is missing. Please log out and register or log in again."
      );
      return;
    }

    setSubmitting(true);

    try {
      await registerForEvent(eventId, studentId);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="registration-page">
        <div className="registration-message">Loading event details...</div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="registration-page">
        <div className="registration-message">
          <h1>Event not found</h1>
          <p>This event may have been removed or the link may be incorrect.</p>
          <Link to="/events" className="registration-button">
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  const eventName = event.title || event.name || "Campus event";
  const eventDate = event.date || event.eventDate || "";
  const eventVenue = event.venue || event.location || "Venue to be announced";
  const studentName =
    student?.name || student?.fullName || student?.studentName || "";
  const studentEmail = student?.email || "";

  if (success) {
    return (
      <main className="registration-page">
        <section className="registration-success">
          <div className="registration-success-icon">✓</div>
          <span className="registration-eyebrow">YOU'RE ON THE LIST</span>
          <h1>You're registered.</h1>
          <p>
            Your registration for <strong>{eventName}</strong> was submitted
            successfully.
          </p>

          <div className="registration-success-event">
            <span>YOUR EVENT</span>
            <h2>{eventName}</h2>
            {eventDate && <p>{eventDate}</p>}
            <p>{eventVenue}</p>
          </div>

          <Link to="/events" className="registration-button">
            Explore more events <span>↗</span>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="registration-page">
      <div className="registration-topline">
        <Link to="/events" className="registration-back">
          ← Back to events
        </Link>
        <span>STAGE / EVENT REGISTRATION</span>
      </div>

      <section className="registration-heading">
        <span className="registration-eyebrow">SAVE YOUR SPOT</span>
        <h1>Make it <em>happen.</em></h1>
        <p>
          You're one step away. Check your details and confirm your place at
          this campus event.
        </p>
      </section>

      <div className="registration-layout">
        <section className="registration-form-card">
          <div className="registration-card-heading">
            <span>01</span>
            <div>
              <h2>Your details</h2>
              <p>We'll use your student account for this registration.</p>
            </div>
          </div>

          {!student ? (
            <div className="registration-login-prompt">
              <h3>Log in to continue</h3>
              <p>
                You need a STAGE student account to register for campus events.
              </p>
              <Link
                to="/login"
                className="registration-button"
              >
                Log in to STAGE <span>↗</span>
              </Link>
              <p className="registration-small-text">
                New to STAGE? <Link to="/register">Create an account</Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="registration-form">
              <label htmlFor="registration-name">Full name</label>
              <input
                id="registration-name"
                type="text"
                value={studentName}
                placeholder="Your registered name"
                readOnly
              />

              <label htmlFor="registration-email">Email address</label>
              <input
                id="registration-email"
                type="email"
                value={studentEmail}
                placeholder="Your registered email"
                readOnly
              />

              <div className="registration-account-note">
                <span>ⓘ</span>
                These details come from your STAGE account.
              </div>

              <label className="registration-checkbox">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                <span>
                  I confirm that I want to register for this event using my
                  student account.
                </span>
              </label>

              {error && (
                <div className="registration-error" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="registration-button"
                disabled={submitting}
              >
                {submitting ? "Registering..." : "Confirm registration"}
                {!submitting && <span>↗</span>}
              </button>
            </form>
          )}

          {!student && error && (
            <p className="registration-error" role="alert">{error}</p>
          )}
        </section>

        <aside className="registration-event-card">
          <div className="registration-event-art">
            <span>YOUR CAMPUS.</span>
            <strong>YOUR<br />STAGE.</strong>
            <span>YOUR NEXT EXPERIENCE AWAITS.</span>
          </div>

          <div className="registration-event-info">
            <span className="registration-event-category">
              {event.category || event.type || "CAMPUS EVENT"}
            </span>
            <h2>{eventName}</h2>

            {event.description && <p>{event.description}</p>}

            <div className="registration-detail">
              <span>DATE</span>
              <strong>{eventDate || "To be announced"}</strong>
            </div>

            <div className="registration-detail">
              <span>VENUE</span>
              <strong>{eventVenue}</strong>
            </div>

            {event.time && (
              <div className="registration-detail">
                <span>TIME</span>
                <strong>{event.time}</strong>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default EventRegistration;
