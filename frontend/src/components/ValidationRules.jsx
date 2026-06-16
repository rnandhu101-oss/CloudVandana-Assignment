import { useEffect, useState } from "react";
import API from "../services/api";

const ValidationRules = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await API.get(
        "/auth/validation-rules"
      );

      setRules(response.data);
    } catch (error) {
      console.error(
        "Error fetching validation rules:",
        error
      );
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const toggleRule = async (id, active) => {
    try {
      await API.patch(
        `/auth/toggle-validation/${id}`,
        {
          active: !active,
        }
      );

      fetchRules();
    } catch (error) {
      console.error(
        "Error updating validation rule:",
        error
      );
    }
  };

  return (
    <div className="rules-grid">
      {rules.map((rule) => (
        <div
          key={rule.Id}
          className="rule-card"
        >
          <h3>{rule.ValidationName}</h3>

          <div
            className={`status ${
              rule.Active
                ? "active"
                : "inactive"
            }`}
          >
            {rule.Active
              ? "Active"
              : "Inactive"}
          </div>

          <button
            className={
              rule.Active
                ? "disable-btn"
                : "enable-btn"
            }
            onClick={() =>
              toggleRule(
                rule.Id,
                rule.Active
              )
            }
          >
            {rule.Active
              ? "Disable Rule"
              : "Enable Rule"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ValidationRules;