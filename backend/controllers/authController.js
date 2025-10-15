const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '30d' }
  );
};

exports.registerUser = async (req, res) => {
  try {
    console.log('Registration attempt with body:', req.body); // Debug log

    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array()); // Debug log
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    const { name, email, password, role } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      console.log('Missing required fields'); // Debug log
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email); // Debug log
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('Email already exists:', email); // Debug log
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user'
    });

    console.log('User created successfully:', { id: user._id, email: user.email }); // Debug log

    // Generate token
    const token = generateToken(user);

    // Send response
    res.status(201).json({ 
      success: true,
      message: 'Registration successful', 
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    console.error('Registration error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    
    // Handle MongoDB errors
    if (err.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already registered',
        error: 'duplicate_email' 
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: messages 
      });
    }

    // Generic error
    res.status(500).json({ 
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ 
      message: 'Login success', 
      id: user._id, 
      name: user.name,
      role: user.role,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ 
      message: 'Login success', 
      id: admin._id, 
      name: admin.name,
      role: admin.role
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
