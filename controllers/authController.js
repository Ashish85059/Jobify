import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

export const login=async(req,res)=>{
    const {email,password} = req.body;
    res.status(200).json({msg:"Login successful"})
}

export const register=async(req,res)=>{
    const user=await User.create(req.body);
     res.status(StatusCodes.CREATED).json(user);
}