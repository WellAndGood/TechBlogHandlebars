const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../../models");
const bcrypt = require('bcrypt');

// Sign up a new user
router.post('/signup', async (req, res) => {
    try {

      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Login
router.post('/login', async (req, res) => {
    try {
      console.log(req.body)
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      console.log("dbUserData", dbUserData)
  
      if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      // Once the user successfully logs in, set up the sessions variable 'loggedIn'
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        console.log("login", req.session)
        res
          .status(200)
          .json({ id: dbUserData.id, user: dbUserData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;