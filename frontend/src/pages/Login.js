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
        "http://13.233.101.36:5000/login",
        {
          email,
          password,
        }
      );

     localStorage.setItem("token", res.data.token);

     alert(res.data.message);

     navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
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
