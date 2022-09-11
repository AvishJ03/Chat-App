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
    user.password = undefined;
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
    user.password = undefined;
    res.json({ user, status: true });
  } catch (err) {
    next(err);
  }
}

async function setAvatar(req, res, next) {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        returnDocument: "after",
      }
    );
    res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    res.json(users);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  register,
  login,
  setAvatar,
  getAllUsers,
};
