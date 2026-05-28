import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const registerUser = async () => {

    try {

      await axios.post("https://secureportalben.duckdns.org/api/register", {
        email,
        password,
        role
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #141e30, #243b55)",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >

        <h1>Secure User Management Portal</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#243b55",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
<p style={{ marginTop: "15px", textAlign: "center" }}>
  Already have an account?{" "}
  <a href="/login">Login</a>
</p>
      </div>

    </div>

  );

}

export default Register;
