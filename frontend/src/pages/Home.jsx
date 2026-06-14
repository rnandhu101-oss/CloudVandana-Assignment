import Login from "../components/Login";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="overlay">
        <div className="home-card">
          <h1>CloudVandana Assignment</h1>

          <p>
            Salesforce Validation Rules
            Management Dashboard
          </p>

          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;