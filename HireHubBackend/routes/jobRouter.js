import express from "express";
import {deleteJob, getAllJob,getMyJobs,getSingleJob,postJob,updateJob,countCategories, jobsByCount, latestJob, similarJobs} from "../controller/jobController.js";
import { isLoggedin } from "../middleware/isLoggedIn.js";
const router=express.Router();

router.post('/postJob',isLoggedin,postJob);
router.get('/similarJobs/:id',similarJobs);
router.get('/latestJob',isLoggedin,latestJob);
router.get('/countCategories',countCategories);
router.get('/jobsByCategory',jobsByCount);
router.get('/getAll',getAllJob);



router.get('/getMyJobs',isLoggedin,getMyJobs);
router.put('/updateJob/:id',isLoggedin,updateJob);
router.delete('/deleteJob/:id',isLoggedin,deleteJob);
router.get('/:id',isLoggedin,getSingleJob);

export default router;  

