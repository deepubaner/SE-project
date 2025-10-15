const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: "Healthcare Management System API Running",
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        adminLogin: 'POST /api/auth/admin/login'
      }
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthcare';
    console.log('Attempting MongoDB connection to:', MONGO_URI);
    
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    console.log("✅ MongoDB connected successfully");
    
    // Test database by counting users
    const userCount = await mongoose.model('User').countDocuments();
    console.log(`Current user count in database: ${userCount}`);
    
  } catch (err) {
    console.error("❌ MongoDB connection error:", {
      name: err.name,
      message: err.message,
      code: err.code
    });
    
    // Retry logic
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Mongoose error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectDB, 5000);
});

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthcare';
  console.log(`
🚀 Server running at http://localhost:${PORT}
📝 API Documentation available at http://localhost:${PORT}
💾 Database: ${dbUri}
  `);
});

