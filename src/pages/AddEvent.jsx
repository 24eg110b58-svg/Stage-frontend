import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import "./AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Cultural",
    date: "",
    time: "",
    venue: "",
    description: "",
    organizer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createEvent(form);
      navigate("/events");
    } catch (err) {
      setError(err.message || "Could not publish your event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="create-page">
      <section className="create-hero">
        <div className="create-hero-inner">
          <div className="create-breadcrumb">
            <span>STAGE</span>
            <span className="breadcrumb-divider">/</span>
            <span>ORGANIZER STUDIO</span>
          </div>

          <div className="create-hero-content">
            <div>
              <p className="create-eyebrow">YOUR NEXT BIG IDEA STARTS HERE</p>
              <h1>
                Create an
                <br />
                <span>experience.</span>
              </h1>
              <p className="create-hero-description">
                Bring your campus together. Create something worth showing up
                for, and let students discover what you have planned.
              </p>
            </div>

            <div className="create-hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one"></div>
              <div className="art-orbit orbit-two"></div>
              <div className="art-center">S<span>✳</span></div>
              <div className="art-note note-one">♪</div>
              <div className="art-note note-two">✦</div>
              <div className="art-note note-three">↗</div>
            </div>
          </div>

          <div className="create-hero-footer">
            <span><i></i> MADE FOR CAMPUS LIFE</span>
            <span>IDEAS INTO EXPERIENCES — STAGE</span>
          </div>
        </div>
      </section>

      <section className="create-workspace">
        <div className="create-section-heading">
          <div>
            <p className="create-eyebrow">THE DETAILS MATTER</p>
            <h2>Bring your event to life.</h2>
            <p>Fill in the details below to share your event with students.</p>
          </div>
          <div className="create-step">
            <span>01</span>
            <span>EVENT DETAILS</span>
          </div>
        </div>

        <div className="create-layout">
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="create-form-section">
              <div className="create-form-heading">
                <span className="create-section-number">01</span>
                <div>
                  <h3>The basics</h3>
                  <p>Give your event its identity.</p>
                </div>
              </div>

              <div className="create-field">
                <label htmlFor="title">Event name <span>*</span></label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. The Unplugged Sessions"
                  maxLength={100}
                  required
                />
              </div>

              <div className="create-field">
                <label htmlFor="category">Event category <span>*</span></label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Cultural">Cultural</option>
                  <option value="Music">Music</option>
                  <option value="Dance">Dance</option>
                  <option value="Photography">Photography</option>
                  <option value="Literature">Literature & Poetry</option>
                  <option value="Technical">Technical</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="create-field">
                <label htmlFor="description">About the event <span>*</span></label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What's happening? What can students expect? Tell them why they should be there..."
                  rows={5}
                  maxLength={1000}
                  required
                />
                <div className="create-character-count">
                  {form.description.length}/1000
                </div>
              </div>
            </div>

            <div className="create-form-section">
              <div className="create-form-heading">
                <span className="create-section-number">02</span>
                <div>
                  <h3>Time & place</h3>
                  <p>Help everyone know where to be.</p>
                </div>
              </div>

              <div className="create-two-columns">
                <div className="create-field">
                  <label htmlFor="date">Event date <span>*</span></label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                  />
                </div>

                <div className="create-field">
                  <label htmlFor="time">Start time <span>*</span></label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="create-field">
                <label htmlFor="venue">Venue <span>*</span></label>
                <input
                  id="venue"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  placeholder="e.g. Main Auditorium, Block A"
                  maxLength={150}
                  required
                />
              </div>
            </div>

            <div className="create-form-section last-form-section">
              <div className="create-form-heading">
                <span className="create-section-number">03</span>
                <div>
                  <h3>The organizer</h3>
                  <p>Let students know who's behind it.</p>
                </div>
              </div>

              <div className="create-field">
                <label htmlFor="organizer">Organizer / club name <span>*</span></label>
                <input
                  id="organizer"
                  name="organizer"
                  value={form.organizer}
                  onChange={handleChange}
                  placeholder="e.g. Music Club, Student Council"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            {error && <div className="create-error">{error}</div>}

            <div className="create-form-actions">
              <p>
                <span>✳</span> Your event will appear on the STAGE Events page.
              </p>
              <button type="submit" disabled={loading}>
                {loading ? "Publishing..." : "Publish event"}
                {!loading && <span>↗</span>}
              </button>
            </div>
          </form>

          <aside className="create-preview-column">
            <div className="create-preview-label">
              <span>LIVE PREVIEW</span>
              <span className="preview-live-dot"></span>
            </div>

            <article className="create-preview-card">
              <div className="preview-card-art">
                <div className="preview-art-circle"></div>
                <span className="preview-art-star">✳</span>
                <span className="preview-art-letter">S.</span>
                <span className="preview-art-caption">SOMETHING IS HAPPENING</span>
                <span className="preview-category">
                  {form.category || "EVENT CATEGORY"}
                </span>
              </div>

              <div className="preview-card-content">
                <p className="preview-small-label">COMING TO YOUR CAMPUS</p>
                <h3>{form.title || "Your event name goes here"}</h3>
                <p className="preview-description">
                  {form.description ||
                    "A little description goes a long way. Tell students what makes your event special."}
                </p>

                <div className="preview-detail">
                  <span className="preview-detail-icon">▦</span>
                  <div>
                    <small>DATE & TIME</small>
                    <strong>
                      {form.date
                        ? new Date(`${form.date}T00:00:00`).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )
                        : "Date to be announced"}
                    </strong>
                    <span>{form.time || "Time to be announced"}</span>
                  </div>
                </div>

                <div className="preview-detail">
                  <span className="preview-detail-icon">⌖</span>
                  <div>
                    <small>LOCATION</small>
                    <strong>{form.venue || "Your event venue"}</strong>
                  </div>
                </div>

                <div className="preview-organizer">
                  <div className="preview-organizer-avatar">
                    {(form.organizer.trim().charAt(0) || "O").toUpperCase()}
                  </div>
                  <div>
                    <small>ORGANIZED BY</small>
                    <strong>{form.organizer || "Your club or organization"}</strong>
                  </div>
                </div>
              </div>

              <div className="preview-card-footer">
                <span>DISCOVER. PARTICIPATE. BELONG.</span>
                <span>STAGE ↗</span>
              </div>
            </article>

            <div className="create-preview-tip">
              <span>✦</span>
              <p>
                <strong>A little tip</strong>
                <br />
                Give your event a memorable name and a description that makes
                people want to be part of it.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default AddEvent;