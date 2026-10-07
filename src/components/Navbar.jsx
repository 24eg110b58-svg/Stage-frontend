import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>STAGE</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/events">Events</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;