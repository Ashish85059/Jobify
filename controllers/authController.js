import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs"
import {comparePassword, hashPassword} from  "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register=async(req,res)=>{
    const isFirstAccount=await User.countDocuments()===0; // gives total users in Users collection
    req.body.role=isFirstAccount?"admin":"user"; // agar pehla account hai toh usse admin bnayange

    const hashedPassword=hashPassword(req.body.password);
    req.body.password=hashedPassword;  // hashed password store karega
    const user=await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:"user created"});
}

export const login=async(req,res)=>{
    const {email,password} = req.body;
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("invalid email address")
    }

    const isPasswordCorrect =await comparePassword(req.body.password, user.password)
    if(!isPasswordCorrect) throw new UnauthenticatedError("invalid password")
    res.status(200).json({msg:"Login successful"})
}
