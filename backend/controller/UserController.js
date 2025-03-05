const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;

const register = async (req, res) => {
 
  try {
    const { username, email, password } = req.body;
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
 try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
      const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
      );
      if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
      }
      const token=jwt.sign({id:existingUser._id, email:existingUser.email}, SECRET_KEY, {expiresIn:"24h"});
      res.status(200).json({ message: "Login successful",token,existingUser });
      
 } catch (error) {
    return res.status(500).json({ message: error.message });
 }
};
const updateProfile = async (req, res) => {
    try {
        const {email,password,username}= req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User does not exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate
        ({email},{username, password:hashedPassword});
        res.status(200).json({message:"Profile updated successfully"});
    
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
module.exports = { register, login,updateProfile };