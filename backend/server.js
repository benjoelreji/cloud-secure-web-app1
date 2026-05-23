const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_SECRET = "mysecretkey";
const User = mongoose.model(
  "User",
  new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
})
);
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongodb:27017/secureapp")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.json({
      message: "User Registered Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Registration Failed",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Login Failed",
    });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete Failed",
    });
  }
});
app.listen(5000, "0.0.0.0", () => {
  console.log("Server Running on Port 5000");
});
