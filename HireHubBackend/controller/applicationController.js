import ApplicationModel from "../models/applicationModel.js";
import dotenv from "dotenv";
dotenv.config({ path: 'HireHub/config/config.env' });
import { v2 as cloudinary } from "cloudinary"; // Import cloudinary correctly
import JobModel from "../models/jobModel.js"; // Ensure JobModel is imported
import userModel from "../models/usermodel.js";
import profileModel from "../models/profileModel.js";
export const getMyApplication=async(req,res)=>{
  const {_id}=req.user;
  const applications=await ApplicationModel.find({'applicant':_id});
  res.json(applications);
}
//anyone can post a job
export const postApplication = async (req, res) => {
    try {
      const { coverLetter, email,job,firstName,lastName,contactNumber,currentCity} = req.body;
      if(!email || !firstName || !lastName || !contactNumber || !currentCity)
      {
        return res.status(401).send({
          message:'please fill all info'
        })
      }
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "Please upload a file" });
      }
      const { resume } = req.files;
      const allowedFormat = ['image/jpeg'];
      if (!allowedFormat.includes(resume.mimetype)) {
        return res.status(400).json({ message: 'Invalid file type' });
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, { folder: 'HireHub' });
  
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ message: 'Cloudinary upload error' });
      }
     
      //send login user id 
      const applicant = req.user._id;
      
      if (!job) {
        return res.status(400).json({ message: 'Job not found' });
      }
      //job for which applied
      const jobDetail = await JobModel.findById(job);
      if (!jobDetail) {
        return res.status(404).json({ message: 'Job not found' });
      }

      await jobDetail.save();
      const application = await ApplicationModel.create({
        job,
        applicant,
        coverLetter,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
        email,
        firstName,
        lastName,
        contactNumber,
        currentCity,
      });
      //send application id----->
      jobDetail.applicants.push(application._id);
      await jobDetail.save();
      res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(error => error.message);
        return res.status(400).json({ errors });
    }
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
      const application = await ApplicationModel.findById(id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      const job = await JobModel.findById(application.job);
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }

      // Remove the application ID from the job's applicants array
      job.applicants = job.applicants.filter(applicantId => applicantId.toString() !== id);
      await job.save();
  
      await ApplicationModel.findByIdAndDelete(id);
    
      res.json({ message: 'Application deleted successfully!' });
    } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
// Fetch and send all applicant details for a specific job
export const getApplicantsForJob = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the job by ID
        const job = await JobModel.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Ensure the applicants field is an array
        if (!Array.isArray(job.applicants)) {
            return res.status(500).json({ message: 'Applicants data is not an array' });
        }

        // Extract the array of applicant IDs from the objects in the applicants array
        const applicantIds = job.applicants.map(applicant => applicant._id);

        // Find all applications using the array of IDs
        const applicants = await ApplicationModel.find({ _id: { $in: applicantIds } });

        // const userIds = applicants.map(application => application.applicant.toString());

        // // Fetch the users based on userIds
        // const users = await userModel.find({ _id: { $in: userIds } });
        
        // const profiles=users.map(profile=>profile.profile.toString());

        // const profilee=await profileModel.find({_id:{$in:profiles}});
  
        // const pic=profilee.map(pic=>pic.profile.url);
      
      

        // Ensure the result is an array
        if (!Array.isArray(applicants)) {
            return res.status(500).json({ message: 'Failed to retrieve applicants data' });
        }
       

        
        const applicantDetails = applicants.map(applicant => ({
         
            _id:applicant._id,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            contactNumber: applicant.contactNumber,
            currentCity: applicant.currentCity,
            coverLetter: applicant.coverLetter,
            resumeUrl: applicant.resume.url,
         
        }));
        


        res.status(200).json({ applicants: applicantDetails });
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
   
};
