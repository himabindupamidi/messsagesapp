const express = require('express');
const session = require('express-session');
const router = express.Router();
const userController = require('../controllers/account');

const SESS_NAME = 'user';

router.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // const {username,password} = req.body

    const userData = await userController.signUp(username, password);
    return res.status(201).send(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userController.logIn(username, password);
    if (user) {
      req.session.user = user;
      return res.status(200).send('user logined');
    } else return res.status(401).send('user/password are not found');
  } catch (error) {
    res.status(500).send(error.messagge);
  }
});

router.get('/logout', async (req, res) => {
  const user = req.session.user;
  if (user) {
    req.session.destroy((err) => {
      res.clearCookie(SESS_NAME);
    });
  } else {
    throw new Error('Something went wrong');
  }
});

module.exports = router;
