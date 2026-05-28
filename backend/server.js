const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_SECRET = "mysecretkey";
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

mongoose.connect(
"mongodb+srv://admin:Admin123@cluster0.mom8xuq.mongodb.net/test?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const newUser = new User({
      email,
      password,
      role,
    });

    await newUser.save();

    res.json({
      message: "Registration Successful",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
});
// LOGIN

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {

    res.json({
      message: "Login Successful",
      role: user.role,
      token: "sampletoken"
    });

  } else {

    res.json({
      message: "Invalid Login"
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
