/**
 * Model for Vid template
 * 
 *
 */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const vidSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  tags: {
    type: [Schema.Types.ObjectId], // Use ObjectId to reference Tag model
    ref: "Tag", // Reference to the Tag model
  },
  likeNum: {
    type: Number,
    default: 0,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  thumbnail: {
    type: Buffer,
    required: false,
  }
});

export default mongoose.model("Template", vidSchema);
