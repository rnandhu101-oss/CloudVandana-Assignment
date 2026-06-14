import { useEffect, useState } from "react";
import axios from "axios";
import RuleCard from "./RuleCard";

const ValidationRules = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/validation-rules",
        {
          withCredentials: true,
        }
      );

      setRules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="rules-grid">
      {rules.map((rule) => (
        <RuleCard
          key={rule.Id}
          rule={rule}
          refreshRules={fetchRules}
        />
      ))}
    </div>
  );
};

export default ValidationRules;