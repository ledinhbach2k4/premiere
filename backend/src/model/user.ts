/**
 * MODEL USER
 * 
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String, require: true
    },
    username: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    password: {
        type: String, require: false
    },
    avatar: {
        type: String, require: false
    },
}); 

export default mongoose.model("User", userSchema); // tạo model vào db  