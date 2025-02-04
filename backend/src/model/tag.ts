/**
 * Model for tag
 * 
 */

import mongoose from "mongoose";
import { Schema } from "mongoose";

const tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        require: true,
    }
});

export default mongoose.model("Tag", tagSchema);

