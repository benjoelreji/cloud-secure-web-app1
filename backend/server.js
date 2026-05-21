const express = require('express');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const db = require('./config/db');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.get('/', (req, res) => {
  res.json({ message: 'Secure User Management Portal API is running!' });
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS current_time');
    res.json({
      success: true,
      database: 'Connected successfully',
      time: rows[0].current_time
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.get('/hello', (req, res) => {
  res.send('HELLO WORKING');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
