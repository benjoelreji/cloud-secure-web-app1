const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../config/db');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, role]
    );

    // Success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
// Login API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Step 2: Find user by email
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // Step 3: If user does not exist
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Step 4: Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    // Step 5: If password is incorrect
    if (!isMatch) {
      await pool.query(
        'INSERT INTO login_logs (user_id, ip_address, status) VALUES (?, ?, ?)',
        [user.id, req.ip, 'failed']
      );

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Step 6: Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    // Step 7: Save successful login
    await pool.query(
      'INSERT INTO login_logs (user_id, ip_address, status) VALUES (?, ?, ?)',
      [user.id, req.ip, 'success']
    );

    // Step 8: Send response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
module.exports = router;
