import React from "react";
import {
  FaUserCircle,
  FaShieldAlt,
  FaBell,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div style={{ background: "#f4f7fc", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <div
        style={{
          background: "#0b1f3a",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Secure User Portal</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }}
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: "40px" }}>
        
        <h1 style={{ color: "#0b1f3a" }}>
          Welcome Back User 👋
        </h1>

        <p style={{ color: "gray" }}>
          Monitor your account activity and security status
        </p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <FaUserCircle size={40} color="#2563eb" />
            <h2>Profile</h2>
            <p>User Account Active</p>
          </div>

          <div style={cardStyle}>
            <FaShieldAlt size={40} color="#16a34a" />
            <h2>Security</h2>
            <p>Protected Authentication</p>
          </div>

          <div style={cardStyle}>
            <FaBell size={40} color="#dc2626" />
            <h2>Notifications</h2>
            <p>3 New Alerts</p>
          </div>
        </div>

        {/* Activity Section */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "40px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>
            <FaChartLine /> Recent Activity
          </h2>

          <ul style={{ marginTop: "20px", lineHeight: "2" }}>
            <li>✔ Login successful from EC2 deployment</li>
            <li>✔ JWT authentication verified</li>
            <li>✔ Secure password hashing enabled</li>
            <li>✔ Docker container running successfully</li>
          </ul>
        </div>

        {/* Security Status */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "40px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Security Status</h2>

          <div
            style={{
              height: "20px",
              background: "#ddd",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "92%",
                height: "100%",
                background: "#16a34a",
                borderRadius: "20px",
              }}
            ></div>
          </div>

          <p style={{ marginTop: "10px" }}>
            Security Health: 92%
          </p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
};

export default Dashboard;
