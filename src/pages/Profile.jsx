
import { useState } from "react";

function Profile() {
  const student = JSON.parse(
    localStorage.getItem("stageStudent") || "null"
  );

  const [formData, setFormData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stageProfile")) || {
        fullName: student?.fullName || "",
        department: student?.department || "",
        year: student?.year || "",
        skills: "",
        achievements: "",
      };
    } catch {
      return {
        fullName: student?.fullName || "",
        department: student?.department || "",
        year: student?.year || "",
        skills: "",
        achievements: "",
      };
    }
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = JSON.stringify(formData);
      localStorage.setItem("stageProfile", data);

      const saved = localStorage.getItem("stageProfile");

      if (saved === data) {
        setMessage("Saved successfully!");
      } else {
        setMessage("Data did not save correctly.");
      }
    } catch (error) {
      setMessage("Storage error: " + error.message);
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
          placeholder="Skills"
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

        <button type="submit">Save Profile</button>
      </form>

      <p role="status">{message}</p>

      <h3>Debug: Saved profile data</h3>
      <pre>{localStorage.getItem("stageProfile") || "Nothing saved yet"}</pre>
    </div>
  );
}

export default Profile;