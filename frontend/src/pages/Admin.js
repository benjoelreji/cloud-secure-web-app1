import React from "react";
import {
  FaUsers,
  FaUserShield,
  FaChartLine,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

function Admin() {
  const users = [
    { id: 1, name: "Ben Joel", role: "Admin" },
    { id: 2, name: "Mammen", role: "User" },
    { id: 3, name: "Adithyan", role: "User" },
  ];

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
        <h2>Secure User Management Portal</h2>

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
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      <div style={{ padding: "40px" }}>
        <h1 style={{ color: "#0b1f3a" }}>Admin Dashboard</h1>
        <p style={{ color: "gray" }}>
          Monitor users, roles and system activity
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
            <FaUsers size={40} color="#2563eb" />
            <h2>120</h2>
            <p>Total Users</p>
          </div>

          <div style={cardStyle}>
            <FaUserShield size={40} color="#16a34a" />
            <h2>10</h2>
            <p>Admins</p>
          </div>

          <div style={cardStyle}>
            <FaChartLine size={40} color="#dc2626" />
            <h2>45</h2>
            <p>Active Sessions</p>
          </div>
        </div>

        {/* Graph Section */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "40px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>User Growth Analytics</h2>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "20px",
              height: "250px",
              marginTop: "30px",
            }}
          >
            {[80, 120, 160, 200, 240, 300].map((height, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "50px",
                    height: `${height}px`,
                    background: "#2563eb",
                    borderRadius: "10px 10px 0 0",
                  }}
                ></div>
                <p>Week {index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div
          style={{
            background: "white",
            marginTop: "40px",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>User Management</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ background: "#0b1f3a", color: "white" }}>
                <th style={tableHeader}>ID</th>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Role</th>
                <th style={tableHeader}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={tableCell}>{user.id}</td>
                  <td style={tableCell}>{user.name}</td>
                  <td style={tableCell}>{user.role}</td>

                  <td style={tableCell}>
                    <button
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

const tableHeader = {
  padding: "15px",
};

const tableCell = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

export default Admin;
