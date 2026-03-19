import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import Resume from "../models/resume.model.js";

/** User registration controller */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //return token & user as a response
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/** User login controller */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //check if user exists
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    //check if password is correct
    if (!user.comparePassword(password)) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    //return token & user as a response
    const token = generateToken(user._id);
    return res
      .status(201)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/** get user information controller */
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    //check if user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/** Controller for getting user resume
 *  GET: /api/users/resume
 */
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
