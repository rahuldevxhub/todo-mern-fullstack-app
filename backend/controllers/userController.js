import { comparePassword, hashPassword } from "../helpers/userHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await userModel.findOne({ email});
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = await JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password or email",
      });
    }
    res.status(200).send({
        success: true,
        message: "Login Successfully",
        user: {
          _id: user._id,
          name: user.username,
          email: user.email,
          token
        },
      });
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
