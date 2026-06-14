import { FaSalesforce } from "react-icons/fa";

const Login = () => {

  const handleLogin = () => {
    window.location.href =
      "http://localhost:5000/auth/login";
  };

  return (
    <button
      className="login-btn"
      onClick={handleLogin}
    >
      <FaSalesforce />
      Login with Salesforce
    </button>
  );
};

export default Login;