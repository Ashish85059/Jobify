import {Router} from 'express';
import {validateJobInput,validateIdParam}from "../middlewares/validationMiddlewares.js"
const router =Router()

import {getJob,getAllJobs,createJob,updateJob,deleteJob} from "../controllers/jobController.js";
import { checkForTestUser } from '../middlewares/authMiddleware.js';

// router.get('/', getAllJobs);
 
router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router.route("/:id").get(validateIdParam,getJob).patch(checkForTestUser,validateJobInput,validateIdParam, updateJob).delete(checkForTestUser,validateIdParam,deleteJob)

export default router;
