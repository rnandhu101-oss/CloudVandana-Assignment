import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ValidationRules from "../components/ValidationRules";
import API from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const res = await API.get(
        "/auth/validation-rules"
      );

      setRules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // Dynamic stats
  const totalRules = rules.length;

  const activeRules =
    rules.filter(
      (rule) => rule.Active
    ).length;

  const inactiveRules =
    totalRules - activeRules;

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>
            Validation Rules Dashboard
          </h1>

          <p>
            Manage Salesforce Validation
            Rules Professionally
          </p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <h3>{totalRules}</h3>
            <p>Total Rules</p>
          </div>

          <div className="stat-card active-card">
            <h3>{activeRules}</h3>
            <p>Active</p>
          </div>

          <div className="stat-card inactive-card">
            <h3>{inactiveRules}</h3>
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