const User = require("../model/userModel");
const bcrypt = require("bcrypt");

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      res.json({ message: "Username already used!", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.json({ message: "Email already exists!", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    res.json({ user, status: true });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ message: "Incorrect username!", status: false });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      res.json({ message: "Incorrect password!", status: false });
    }
    delete user.password;
    res.json({ user, status: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
