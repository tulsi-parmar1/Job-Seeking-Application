import ApplicationModel from "../models/applicationModel.js";
import dotenv from "dotenv";
dotenv.config({ path: "HireHub/config/config.env" });
import JobModel from "../models/jobModel.js";
export const getMyApplication = async (req, res) => {
  const { _id } = req.user;
  const applications = await ApplicationModel.find({ applicant: _id });
  res.json(applications);
};
export const postApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      currentCity,
      contactNumber,
      email,
      coverLetter,
    } = req.body;

    // Check if the file is present
    if (!req.files || !req.files.resume) {
      return res.status(400).send("No resume file was uploaded.");
    }

    const resumeFile = req.files.resume;

    // Check if the uploaded file is a PDF
    if (resumeFile.mimetype !== "application/pdf") {
      return res.status(400).send("Only PDF files are allowed.");
    }

    // Move the PDF file to the desired location
    const uniqueFileName = `${Date.now()}-${resumeFile.name}`;
    const uploadPath = `./uploads/${uniqueFileName}`;

    // Use promise-based method for file moving to avoid callback issues
    await resumeFile.mv(uploadPath);

    // Save the filename for database reference
    const resumeName = resumeFile.name;

    // Fetch job ID and validate if the job exists
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }

    const employerId = job.postedBy;

    // Ensure the employer exists
    if (!employerId) {
      return res.status(404).send("Employer not found");
    }

    // Retrieve applicant (user who is applying)
    const applicant = req.user._id;

    // Create a new application
    const application = new ApplicationModel({
      job: job._id,
      applicant,
      resume: resumeName, // Save the resume name in DB
      coverLetter,
      firstName,
      lastName,
      contactNumber,
      currentCity,
      email,
    });

    // Save the application to the database
    await application.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.log(error);
    // Send error message if any issue arises
    res.status(500).send(error.message || "An error occurred");
  }
};
export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await ApplicationModel.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const job = await JobModel.findById(application.job);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Remove the application ID from the job's applicants array
    job.applicants = job.applicants.filter(
      (applicantId) => applicantId.toString() !== id
    );
    await job.save();

    await ApplicationModel.findByIdAndDelete(id);

    res.json({ message: "Application deleted successfully!" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
export const getApplicantsForJob = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the job by ID
    const job = await JobModel.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure the applicants field is an array
    if (!Array.isArray(job.applicants)) {
      return res
        .status(500)
        .json({ message: "Applicants data is not an array" });
    }

    // Extract the array of applicant IDs from the objects in the applicants array
    const applicantIds = job.applicants.map((applicant) => applicant._id);

    // Find all applications using the array of IDs
    const applicants = await ApplicationModel.find({
      _id: { $in: applicantIds },
    });

    // const userIds = applicants.map(application => application.applicant.toString());

    // // Fetch the users based on userIds
    // const users = await userModel.find({ _id: { $in: userIds } });

    // const profiles=users.map(profile=>profile.profile.toString());

    // const profilee=await profileModel.find({_id:{$in:profiles}});

    // const pic=profilee.map(pic=>pic.profile.url);

    // Ensure the result is an array
    if (!Array.isArray(applicants)) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve applicants data" });
    }

    const applicantDetails = applicants.map((applicant) => ({
      _id: applicant._id,
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
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
