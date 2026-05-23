import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, []);
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Secure Dashboard</h1>
        <p>User Login Successful</p>

        <button onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
