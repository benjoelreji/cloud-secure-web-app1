import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const loginUser = async () => {
  try {

    const res = await axios.post(
      "https://secureportalben.duckdns.org/api/login",
      {
        email,
        password,
      }
    );

    if (res.data.message === "Login Successful") {

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } else {
      alert("Invalid Login");
    }

  } catch (err) {

    if (err.response && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Login Failed");
    }

  }
};
  return (
     <div className="container">
    <div className="form-box">
      <h1>Login User</h1>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>
    </div> 
  </div>
  );
}

export default Login;
