const express = require("express");
const { registerUser, loginUser, loginAdmin } = require("../controllers/authController");
const { check } = require('express-validator');
const router = express.Router();

// Validation middleware
const registerValidation = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role')
    .optional()
    .isIn(['user', 'admin', 'doctor']).withMessage('Invalid role')
];

const loginValidation = [
  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  check('password')
    .notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/admin/login", loginValidation, loginAdmin);

module.exports = router;
