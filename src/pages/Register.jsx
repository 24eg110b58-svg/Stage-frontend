function Register() {
  return (
    <div className="form-container">
      <h1>Student Registration</h1>

      <form>
        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <select>
          <option>Select Department</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
        </select>

        <select>
          <option>Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;