import { FaSalesforce } from "react-icons/fa";

const Login = () => {

  const handleLogin = () => {
    window.location.href =
    `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
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