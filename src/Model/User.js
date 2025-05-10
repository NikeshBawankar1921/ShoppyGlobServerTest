// User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  //user Schema 
    username: String, //username as string
    password: String   //password as string
});

export default mongoose.model("User", userSchema);
