function Profile() {
  return (
    <div className="form-container">
      <h1>Create Profile</h1>

      <form>
        <input type="text" placeholder="Full Name" />

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

        <input
          type="text"
          placeholder="Skills (e.g. Singing, Photography, Coding)"
        />

        <textarea
          rows="4"
          placeholder="Achievements"
        ></textarea>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;