import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return req.status(400).json({ msg: "Please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ msg: "Success" });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id} ` });
  }

  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    return req.status(400).json({ msg: "Please provide company and position" });
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id} ` });
  }

  job.position = position;
  job.company = company;

  res.status(200).json({ msg: "Job modified", job });
};


export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id} ` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: "Job deleted" });
};
