/**
 *  QUẢN LÝ USER
 * NƠI CHỨA CÁC PHƯƠNG THỨC NHƯ THÊM XOÁ SỬA CHO USER
 */

import User from "../model/user";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// get list of all user
export const getListUser = async (req: Request, res: Response) => {
  try {
    const result = await User.find();

    res.status(200).json({
      message: "List of users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving all users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// DELETE ALL USERS
export const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({
      message: "All users deleted successfully",
      deletedCount: result.deletedCount, // Include the count of deleted users
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//  ADD USER
export const addUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save(); // Save the new user to the database
    res.status(201).json({
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const checkToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ error: "Missing Google token" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ error: "Invalid Google token" });
    } else {
      let user = await User.findOne({ googleId: payload.sub });
      if (!user) {
        user = new User({
          googleId: payload.sub,
          username: payload.name,
          email: payload.email,
        });
        await user.save();
      }

      // Generate JWT token
      const userToken = generateToken(user);
      res.json({ token: userToken, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
