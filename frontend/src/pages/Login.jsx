import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert("Invalid Credentials");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="text-center mb-4">
          Login User
        </h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;
