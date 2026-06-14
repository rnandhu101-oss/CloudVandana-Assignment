import axios from "axios";
import "../styles/RuleCard.css";

const RuleCard = ({ rule, refreshRules }) => {
  const toggleRule = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/auth/validation-rule/${rule.Id}`,
        {
          active: !rule.Active,
        },
        {
          withCredentials: true,
        }
      );

      refreshRules();
    } catch (error) {
      console.error(error);
      alert("Failed to update validation rule");
    }
  };

  return (
    <div className="rule-card">
      <div className="rule-header">
        <h3>{rule.ValidationName}</h3>

        <span className={rule.Active ? "status active" : "status inactive"}>
          {rule.Active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="rule-footer">
        <button
          className={rule.Active ? "danger-btn" : "success-btn"}
          onClick={toggleRule}
        >
          {rule.Active ? "Disable Rule" : "Enable Rule"}
        </button>
      </div>
    </div>
  );
};

export default RuleCard;