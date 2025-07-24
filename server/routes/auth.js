const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Signup body:", req.body); 

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).send('Username or email already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    return res.status(201).send('User created');
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).send('Signup failed');
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login body:", req.body); 

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send('Login failed');
  }
});

module.exports = router;
