/**
 * Model for Vid template
 *
 */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const vidSchema = new mongoose.Schema({
  vid_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  tags: {
    type: [String],
    require: true, 
  },
});

export default mongoose.model("Template", vidSchema);
