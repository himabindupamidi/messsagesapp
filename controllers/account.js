const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../models/user');

const signUp = async (username, password) => {
  const saltRound = 12;
  const salt = await bcrypt.genSalt(saltRound);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    password: hashPassword,
  });
  return user.save();
};

const logIn = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }
  return null;
};
module.exports = { signUp, logIn };
