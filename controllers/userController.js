import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const  getCurrentUser=async(req,res)=>{
    const user=await User.findOne({_id:req.user.userId})
    // console.log(user)
    const userwithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user})
}
export const  getApplicationStatus=async(req,res)=>{
    const users=await User.countDocuments();
    const jobs=await Job.countDocuments();

    res.status(StatusCodes.OK).json({"users":users, "jobs":jobs})
}
export const  updateUser=async(req,res)=>{
    const obj={...req.body}
    delete obj.password;
    // console.log(obj)
    const updateUser=await User.findByIdAndUpdate(req.user.userId,obj)
    res.status(StatusCodes.OK).json({msg:"update user"})
}