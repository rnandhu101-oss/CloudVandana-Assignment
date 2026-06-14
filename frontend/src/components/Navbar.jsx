import { FaSalesforce, FaSignOutAlt } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaSalesforce className="logo-icon" />
        <span>CloudVandana</span>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;