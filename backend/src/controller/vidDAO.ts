import { isObjectIdOrHexString } from "mongoose";
import vid from "../model/vid";
import { Request, Response } from "express";
import { json } from "body-parser";

export const addVid = async (req: Request, res: Response) => {
  const { title, url, tags } = req.body;

  try {
    const savedVid = await new vid({ title, url, tags }).save();
    res.status(201).json({
      message: "added new vid",
      savedVid,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "unknown error",
      result: []
    });
  }
};


// DELETE VID BY ID
export const deleteVidById = async (req: Request, res: Response) => {
  const { _id } = req.body;

  // check if _id is a Hex string or not
  if (!isObjectIdOrHexString(_id)) {
    res.status(400).json({
      message: " _id is not instance of a Objectid",
    });
  }

  try {
    const result = await vid.findByIdAndDelete(_id); // delete using ObjectId

    res.status(200).json({
      message: "deleted sucessfully!",
      result,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


// GET TOP 9 NEXT VID TEMPLATE COUNT FROM INDEX
export const getNext10Vid = async (req:Request, res:Response) => {

  const index = parseInt(req.query.index as string)

  console.log(index);

  // Get the total count of documents
  const totalCount = await vid.countDocuments();

  if(index > totalCount) {
    res.status(400).json({
      message: "index is bigger than the total videos"
    });
  }

  try {
    const result = await vid.find().skip(index).limit(9);

    res.status(200).json({
      message: "success find 10",
      result: result
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot get next 10",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }


};

