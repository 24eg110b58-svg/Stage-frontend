import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover Talent", path: "/discover" },
    { name: "Events", path: "/events" },
    { name: "Organizer", path: "/organizer" },
    { name: "Profile", path: "/profile" }
  ];

  return (
    <header className="stage-navbar">
      <div className="navbar-inner">
        <Link to="/" className="stage-brand">
          ST<span>AGE</span>
          <small>YOUR CAMPUS. YOUR STAGE.</small>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/login" className="nav-login">
            Log in
          </Link>
          <Link to="/register" className="nav-join">
            Get started <span>↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;