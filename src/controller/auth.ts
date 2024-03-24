import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`User '${username}' not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User found: ${user.username}`);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log(`Invalid password for user '${username}'`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`Login successful for user '${username}'`);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};
