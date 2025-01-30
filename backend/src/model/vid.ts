/**
 * Model for Vid template
 *
 */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const vidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    require: true,
  },
  tags: {
    type: [Schema.Types.ObjectId], // Use ObjectId to reference Tag model
    ref: "Tag", // Reference to the Tag model
  },
});

export default mongoose.model("Template", vidSchema);
