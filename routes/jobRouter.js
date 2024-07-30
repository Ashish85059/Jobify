import {Router} from 'express';
import {validateJobInput,validateIdParam}from "../middlewares/validationMiddlewares.js"
const router =Router()

import {getJob,getAllJobs,createJob,updateJob,deleteJob} from "../controllers/jobController.js";

// router.get('/', getAllJobs);
 
router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/:id").get(validateIdParam,getJob).patch(validateJobInput,validateIdParam, updateJob).delete(validateIdParam,deleteJob)

export default router;
