import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEvent from "./pages/AddEvent";
import Navbar from "./components/Navbar";
import Organizer from "./pages/Organizer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventRegistration from "./pages/EventRegistration";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import DiscoverStudents from "./pages/DiscoverStudents";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/events/:eventId/register"
  element={<EventRegistration />}
/>
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/discover" element={<DiscoverStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

