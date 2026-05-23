import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "http://13.233.101.36:5000/register",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register User</h1>

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

      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
