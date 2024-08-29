const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      exp,
      total_questionTaken,
      total_correctAnswers,
      total_incorrectAnswers,
      total_consumedTime,
    } = req.body;

    const user = await userModel.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Increment numeric fields if they are provided
    if (exp !== 0) user.exp += exp;
    if (total_questionTaken !== 0)
      user.total_questionTaken += total_questionTaken;
    if (total_correctAnswers !== 0)
      user.total_correctAnswers += total_correctAnswers;
    if (total_incorrectAnswers !== 0)
      user.total_incorrectAnswers += total_incorrectAnswers;
    if (total_consumedTime !== 0) user.total_consumedTime += total_consumedTime;

    const response = await user.save();

    res
      .status(200)
      .json({ message: "Updated successfully", updatedUser: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });

    // check user if exist
    const isUserExist = await userModel.findOne({ username });

    if (isUserExist && (await bcrypt.compare(password, isUserExist.password))) {
      return res.status(200).json({
        message: "Welcome back! 😄",
        token: generateToken({ username: isUserExist.username }),
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  try {
    const { firstname, username, password, confirmPassword } = req.body;

    if (!firstname || !username || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passwords do not match",
      });

    if (password.length < 3)
      return res.status(400).json({
        message: "Password is too short",
      });

    // check if the username already exist
    const isUserExist = await userModel.findOne({ username });

    if (isUserExist) {
      return res.status(400).json({
        message: "Username already exist",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      firstname,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Enjoy the game! 🥳",
      token: generateToken({ username }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // calculate the start index
    const startIndex = (page - 1) * limit;

    // query fot getting the right documents
    const users = await userModel
      .find({ total_questionTaken: { $gt: 0 } })
      .skip(startIndex)
      .limit(limit)
      .sort({ exp: -1 })
      .select("-password");

    // getting the total number of documents in database
    const totalUsers = await userModel.countDocuments();

    // calculate the total number of pages
    // ceil for rounding up
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      page,
      limit,
      users,
      totalUsers,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDummyUser = async (req, res) => {
  try {
    const {
      firstname,
      username,
      password,
      exp,
      total_questionTaken,
      total_correctAnswers,
      total_incorrectAnswers,
      total_consumedTime,
    } = req.body;

    if (!firstname || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the username already exists
    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new userModel({
      firstname,
      username,
      password: hashedPassword,
      exp,
      total_questionTaken,
      total_correctAnswers,
      total_incorrectAnswers,
      total_consumedTime,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Dummy user created successfully",
      user: {
        firstname: newUser.firstname,
        username: newUser.username,
        exp: newUser.exp,
        total_questionTaken: newUser.total_questionTaken,
        total_correctAnswers: newUser.total_correctAnswers,
        total_incorrectAnswers: newUser.total_incorrectAnswers,
        total_consumedTime: newUser.total_consumedTime,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyRank = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch all users sorted by exp in descending order
    const users = await userModel.find().sort({ exp: -1 });

    // Find the user's index in the sorted list
    const myRank = users.findIndex((user) => user._id.toString() === id) + 1;

    return res.status(200).json(myRank);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCurrentUser,
  updateUser,
  login,
  signUp,
  getAllUser,
  addDummyUser,
  getMyRank,
};
