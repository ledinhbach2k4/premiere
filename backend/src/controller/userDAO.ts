/**
 *  QUẢN LÝ USER
 * NƠI CHỨA CÁC PHƯƠNG THỨC NHƯ THÊM XOÁ SỬA CHO USER
 */

import User from "../model/user";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

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
  try {
    const { credential } = req.body;
    if (!credential) {
      res.status(400).json({ success: false, message: "No token" });
      return;
    }
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ success: false, message: "Bad token" });
      return;
    }
    const userId = payload?.sub;
    let user = await User.findOne({ googleId: userId });
    if (!user) {
      user = new User({
        googleId: userId,
        username: payload?.name,
        email: payload?.email,
        avatar: payload?.picture,
      });
      await user.save();
    }
    console.log(user);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Server bi Gay" });
    return;
  }
};
