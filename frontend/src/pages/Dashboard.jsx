import Navbar from "../components/Navbar";
import ValidationRules from "../components/ValidationRules";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Validation Rules Dashboard</h1>

          <p>
            Manage Salesforce Validation Rules Professionally
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats">
          <div className="stat-card">
            <h3>5</h3>
            <p>Total Rules</p>
          </div>

          <div className="stat-card active-card">
            <h3>4</h3>
            <p>Active</p>
          </div>

          <div className="stat-card inactive-card">
            <h3>1</h3>
            <p>Inactive</p>
          </div>
        </div>

        <ValidationRules />
      </div>

      <footer className="footer">
        © 2026 CloudVandana Assignment |
        Developed by Yamala Nandini
      </footer>
    </div>
  );
};

export default Dashboard;