import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash });
  res.json({ message: "Registered" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true }).json(user);
};
