import { isObjectIdOrHexString } from "mongoose";
import Tag from "../model/tag";
import { Request, Response } from "express";

// ADD TAG
export const addTag = async (req: Request, res: Response) => {
  const { tagName } = req.body;

  try {
    const savedTag = await new Tag({ tagName }).save();
    res.status(201).json({
      _id: savedTag._id,
      tagName: savedTag.tagName,
    });
  } catch (error) {
    res.status(400).json({ 
        message: error instanceof Error ? error.message : "unknown error",
    });

  }
};


// DELETE A TAG BY ID
export const deleteTagByID = async (req: Request, res: Response) => {
  const { _id } = req.body;

  // check if _id is a Hex String or not
  if(!isObjectIdOrHexString(_id)) {
    res.status(400).json({
        message: "_id is not instance of a Objectid"
    });
  }

  try {
    const result = await Tag.findByIdAndDelete(_id); // Use the id directly without curly braces

    res.status(200).json({ 
        message: "deleted sucessfully!",
        result  
    });
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ 
        message: "Server error", 
        error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
