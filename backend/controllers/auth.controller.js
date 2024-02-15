import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

import { generateJWTAndSetCookie } from "../utils/generateJWT.js";

export const signup = async (req, res) => {
    try {
        console.log(req);
      const {fullName, username, password, confirmedPassword, gender} = req.body;
       if (password !== confirmedPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({message: "Username already exists"});
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            avatar: gender === "male " ? boyAvatar : girlAvatar
        })

        if(newUser){
            await generateJWTAndSetCookie(newUser._id, res);
            await newUser.save();
            
            res.status(201).json({
              _id: newUser._id,
              fullName: newUser.fullName,
              username: newUser.username,
              avatar: newUser.avatar,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
      console.log("Error in signup", error.message);
      res.status(500).json({message: "Internal server error"});
    }
}
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
      return res.status(400).json({message: "Invalid username or password"});
    }

    generateJWTAndSetCookie(user._id, res);
    
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      avatar: user.avatar,
    });
  
} catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({message: "Internal server error"});
  }
}
export const logout = (req, res) => {
  console.log("logoutUser");
};