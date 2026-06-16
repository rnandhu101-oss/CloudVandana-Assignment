import { useEffect, useState } from "react";
import API from "../services/api";
import ValidationRules from "../components/ValidationRules";

const Dashboard = () => {
  const [rules, setRules] =
    useState([]);

  // fetch rules
  const fetchRules =
    async () => {
      try {
        const res =
          await API.get(
            "/auth/validation-rules"
          );

        setRules(res.data);
      } catch (err) {
        console.log(
          "Fetch error:",
          err
        );
      }
    };

  useEffect(() => {
    fetchRules();
  }, []);

  // dashboard stats
  const totalRules =
    rules.length;

  const activeRules =
    rules.filter(
      (rule) => rule.Active === true
    ).length;

  const inactiveRules =
    rules.filter(
      (rule) => rule.Active === false
    ).length;

  return (
    <div className="dashboard-container">
      <h1>
        Validation Rules
        Dashboard
      </h1>

      <p>
        Manage Salesforce
        Validation Rules
        Professionally
      </p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>
            {totalRules}
          </h2>
          <p>Total Rules</p>
        </div>

        <div className="stat-card">
          <h2>
            {activeRules}
          </h2>
          <p>Active</p>
        </div>

        <div className="stat-card">
          <h2>
            {inactiveRules}
          </h2>
          <p>Inactive</p>
        </div>
      </div>

      {/* Rules Component */}
      <ValidationRules
        rules={rules}
        setRules={setRules}
      />
    </div>
  );
};

export default Dashboard;