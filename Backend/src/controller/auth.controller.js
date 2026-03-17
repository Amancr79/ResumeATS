const userModel = require("../schema/user/user.model");
const blacklistTokenModel = require("../schema/blacklist/blacklist.token");
const userService = require("../service/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    res.status(400).json({ message: "Username or email already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, email, password: hash });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);
  const user = await userService.createUser({
    username,
    email,
    password: hash,
  });
  res.status(201).json({ token, user });
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }
  console.log(email);
  const user = await userModel.findOne({ email });
  console.log(user);
  const users = await userModel.find();
  console.log(users);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

async function logoutController(req,res){
  const token = req.cookies.token;
  await blacklistTokenModel.create({ token });
  res.clearCookie(token);
  res.status(200).json({ message: "User logged out successfully" });
}

async function getUserProfileController(req,res){
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  if(!user){
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message:"User profile retrieved successfully",
    user:{
      user_id:user.id,
      username:user.username,
      email:user.email
    }
  })
}

module.exports = { registerUserController, loginUserController, logoutController,getUserProfileController };