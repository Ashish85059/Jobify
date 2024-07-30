import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {

  const jobs = await Job.find({createdBy:req.user.userId});
  // console.log(req.user)
  res.status(StatusCodes.OK).json({ jobs });

};

export const createJob = async (req, res) => {
    req.body.createdBy=req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
    
  
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job=await Job.findById(id); 
  
  if (!job) {
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  
  const updatedJob=await Job.findByIdAndUpdate(id,req.body,{
    new: true,
  });

  
  if (!updatedJob) {
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ msg: "Job modified", job: updateJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob=await Job.findByIdAndDelete(id);

  if (!removedJob) { 
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removedJob });
};
