import { useState } from "react";
import { registerStudent } from "../services/studentService";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    year: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setMessage("");
    setLoading(true);

    try {
      await registerStudent(formData);

      setMessage("Registration successful!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        department: "",
        year: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(
        error?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
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

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </div>
  );
}

export default Register;