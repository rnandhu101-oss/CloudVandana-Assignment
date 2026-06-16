import { useEffect, useState } from "react";
import API from "../services/api";

const ValidationRules = () => {
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

  const toggleRule = async (
    id,
    currentStatus
  ) => {
    // instant UI update
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.Id === id
          ? {
              ...rule,
              Active:
                !currentStatus,
            }
          : rule
      )
    );

    try {
      await API.patch(
        `/auth/toggle/${id}`,
        {
          active:
            !currentStatus,
        }
      );
    } catch (err) {
      console.log(err);

      // rollback if fail
      setRules((prevRules) =>
        prevRules.map((rule) =>
          rule.Id === id
            ? {
                ...rule,
                Active:
                  currentStatus,
              }
            : rule
        )
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
          <h3>
            {rule.ValidationName}
          </h3>

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