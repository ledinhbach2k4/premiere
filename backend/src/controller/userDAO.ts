/**
 *  QUẢN LÝ USER
 * NƠI CHỨA CÁC PHƯƠNG THỨC NHƯ THÊM XOÁ SỬA CHO USER
 */


import User from "../model/user";
import { Request, Response } from "express";

// GET ALL USER
export const getListUser = async (req: Request, res: Response) => {
  try {
    console.log("getlistUser");

    res.status(200).json({
      message: "List",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get All User",
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
  const { name, email, password, age } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    age,
  });

  try {
    const savedUser = await newUser.save(); // Save the new user to the database
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: "Error get All User",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
