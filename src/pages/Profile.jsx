import { useState, useEffect } from "react";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8080"
}/students`;

function Profile() {
  const [student] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stageStudent") || "null");
    } catch {
      return null;
    }
  });

  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    year: "",
    skills: "",
    achievements: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!student?.id) {
        setMessage("Please log out and log in again, then reopen your profile.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/${student.id}/profile`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Student profile not found."
              : "Could not load your profile."
          );
        }

        const data = await response.json();

        setFormData({
          fullName: data.fullName || "",
          department: data.department || "",
          year: data.year || "",
          skills: data.skills || "",
          achievements: data.achievements || "",
        });
      } catch (error) {
        setMessage(error.message || "Could not load your profile.");
      } finally {
        setLoading(false);
      }
    }

    if (student) {
      loadProfile();
    }
  }, [student]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!student?.id) {
      setMessage("Please log out and log in again before saving.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/${student.id}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Could not save your profile."
        );
      }

      setFormData({
        fullName: data.fullName || "",
        department: data.department || "",
        year: data.year || "",
        skills: data.skills || "",
        achievements: data.achievements || "",
      });

      localStorage.setItem(
        "stageStudent",
        JSON.stringify({
          ...student,
          fullName: data.fullName,
          department: data.department,
          year: data.year,
        })
      );

      setMessage("Profile saved successfully!");
    } catch (error) {
      setMessage(
        error.message ||
          "Could not save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!student) {
    return (
      <div className="form-container">
        <h1>Please log in first</h1>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>My Profile</h1>
      <p>Logged in as: {student.email}</p>

      {loading ? (
        <p>Loading your profile...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <input
            name="skills"
            placeholder="Skills (e.g. Singing, Photography, Coding)"
            value={formData.skills}
            onChange={handleChange}
          />

          <textarea
            name="achievements"
            placeholder="Achievements"
            rows="4"
            value={formData.achievements}
            onChange={handleChange}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}

      <p role="status">{message}</p>
    </div>
  );
}

export default Profile;
