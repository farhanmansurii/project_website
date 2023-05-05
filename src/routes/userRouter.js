const express = require('express');
const router = express.Router();
const { Login, Signup } = require('../models/userinfo');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const user = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: new Date()
    });
    await user.save();
    res.render('login');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    const isPasswordValid = req.body.password === user.password;
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }
    res.render('index');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
