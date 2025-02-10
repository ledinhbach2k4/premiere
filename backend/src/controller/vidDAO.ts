import { isObjectIdOrHexString } from "mongoose";
import vid from "../model/vid";
import { Request, Response } from "express";
import { json } from "body-parser";
import { error } from "console";

// add new video
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
      result: [],
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
export const getNext10Vid = async (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string);
    const tags = req.query.tags;
    const searchQuery = req.query.searchQuery as string | undefined;

    console.log(searchQuery);
    console.log(123);

    let filter: any = {};
    if (tags && Array.isArray(tags) && tags.length > 0) {
      filter.tags = { $all: tags };
    }

    if (searchQuery && typeof searchQuery === "string") {
      filter.title = { $regex: new RegExp(searchQuery, "i") };
    }

    // Get the total count of documents
    const totalCount = await vid.countDocuments();

    if (index > totalCount) {
      const data = await vid
        .find(filter)
        .sort({ releaseDate: -1 })
        .limit(totalCount);
      res.status(200).json({
        message: "index is bigger than the total videos",
        data: data,
      });
    } else {
      const data = await vid
        .find(filter)
        .sort({ releaseDate: -1 })
        .limit(index);
      res.status(200).json({
        message: "success find 10",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot get next 10",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get list of 9 video sort by Like Num, most liked to lowest.
export const get9VidSortByLiked = async (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string);
    const tags = req.query.tags;
    const searchQuery = req.query.searchQuery as string | undefined;

    let filter: any = {};
    if (tags && Array.isArray(tags) && tags.length > 0) {
      filter.tags = { $all: tags };
    }

    if (searchQuery && typeof searchQuery === "string") {
      filter.title = { $regex: new RegExp(searchQuery, "i") };
    }

    // Get the total count of documents
    const totalCount = await vid.countDocuments();

    if (index > totalCount) {
      const data = await vid
        .find(filter)
        .sort({ likeNum: -1 })
        .limit(totalCount);
      res.status(200).json({
        message: "index is bigger than the total videos",
        data: data,
      });
    } else {
      const data = await vid.find(filter).sort({ likeNum: -1 }).limit(index);
      res.status(200).json({
        message: "get list descending likeNum",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot get Vid",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// DELETE ALL VIDEOS
export const deleteAllVids = async (req: Request, res: Response) => {
  try {
    const result = await vid.deleteMany({}); // Delete all documents in the collection
    res.status(200).json({
      message: "All videos deleted successfully!",
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

// GET video by Id
export const getVidById = async (req: Request, res: Response) => {
  try {
    const _id = req.query._id as string;

    console.log(_id);

    if (!_id) {
      res.status(400).json({
        message: "no Id provided",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // check if _id is a Hex String or not
    if (!isObjectIdOrHexString(_id)) {
      res.status(400).json({
        message: "_id is not instance of a Objectid",
      });
    }

    const data = await vid.findById(_id);

    res.status(200).json({
      message: "retreive video from Id",
      data: data,
    });

  } catch (error) {
    res.status(404).json({
      message: "No video found",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
