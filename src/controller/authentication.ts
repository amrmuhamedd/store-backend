import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import { comparePasswords, generateAuthToken } from "../utils/auth";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const token = await generateAuthToken({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "username or password is incorrect" });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "username or password is incorrect" });
    }

    const token = generateAuthToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getLoggedInUserInfo = (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
