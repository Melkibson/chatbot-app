import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            avatar: newUser.avatar,
        });

    } catch (error) {
      console.log("Error in signup", error.message);
      res.status(500).json({message: "Internal server error"});
    }
}
export const login = (req, res) => {
  console.log("loginUser");
};
export const logout = (req, res) => {
  console.log("logoutUser");
};