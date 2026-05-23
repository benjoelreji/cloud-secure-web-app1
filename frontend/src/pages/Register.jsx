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
          password
        }
      );

      alert(res.data.message);

    } catch (err) {

      alert("Registration Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="mb-4 text-center">
          Register User
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
          className="btn btn-success w-100"
          onClick={registerUser}
        >
          Register
        </button>

      </div>

    </div>

  );

}

export default Register;
