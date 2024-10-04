import JobModel from "../models/jobModel.js";
import { v2 as cloudinary } from "cloudinary"; // Import cloudinary correctly

export const getAllJob = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID

    // Find all jobs where the `postedBy` field is not equal to the logged-in user's ID
    const jobs = await JobModel.find({
      deadline: false,
      postedBy: { $ne: userId }, // Exclude jobs posted by the current user
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

export const postJob = async (req, res) => {
  if (!req.user.role || req.user.role != "recruiter") {
    res.status(401).send({
      message: "only recruiter can post job",
    });
  }
  const {
    title,
    description,
    categories,
    company,
    location,
    employmentType,
    salaryRangeMin,
    salaryRangeMax,
    requirements,
    responsibilities,
    postedDate,
    deadline,
    contactEmail,
  } = req.body;
  if (!title || !description || !company || !location || !categories) {
    return res.status(401).json({
      success: false,
      message: "please provide full job details",
    });
  }
  const { logo } = req.files;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(402).send({ error: "upload a file" });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    logo.tempFilePath,
    { folder: "HireHub" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return res.status(500).json({ message: "Cloudinary upload error" });
  }
  const postedBy = req.user._id;
  const salaryRange = {
    min: parseFloat(salaryRangeMin),
    max: parseFloat(salaryRangeMax),
  };
  try {
    const job = await JobModel.create({
      title,
      description,
      categories,
      company,
      location,
      employmentType,
      salaryRange,
      requirements,
      responsibilities,
      postedDate,
      deadline,
      contactEmail,
      postedBy,
      logo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.json({
      success: true,
      message: "job posted succesfully",
    });
  } catch (error) {
    res.status(403).send({
      message: "server error",
    });
    console.log(error);
  }
};
export const getMyJobs = async (req, res, next) => {
  const myjobs = await JobModel.find({ postedBy: req.user._id });
  res.send({ myjob: myjobs });
};
export const updateJob = async (req, res) => {
  const { id } = req.params;
  let job = await JobModel.findById(id);
  if (!job) {
    return res.status(401).send({
      message: "jobs are not found!",
    });
  }
  job = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.send({
    message: "updated succesfully",
  });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  // const job=JobModel.findById(id);
  await JobModel.findByIdAndDelete(id);
  res.send({
    message: "deleted successfully!",
  });
};
export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(400).send({ message: "no jobs" });
    }
    const applicantsLength = job.applicants.length;
    res.status(200).json({
      applicantsLength,
      job,
    });
  } catch (error) {
    return res.status(400).send({ message: "invalid id or cast error" }); ///cast error means changing id]s characters
  }
};
export const similarJobs = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the job by its ID
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { title } = job;
    const keywords = title.split(" ");
    const regexQueries = keywords.map((keyword) => ({
      title: new RegExp(keyword, "i"),
    }));

    const similarJobs = await JobModel.find({
      $and: [
        { _id: { $ne: id } },
        {
          $or: regexQueries,
        },
      ],
    });
    res.json(similarJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
export const countCategories = async (req, res) => {
  // try {
  //     const jobs = await JobModel.find(); // Fetch all jobs as array
  //     const categoryCount = {};

  //     // Count jobs by category
  //     jobs.forEach(job => {
  //         const category = job.categories;
  //         if (categoryCount[category]) {
  //             categoryCount[category] += 1; // Increment count
  //         } else {
  //             categoryCount[category] = 1; // Initialize count
  //         }
  //     });
  //     res.json(categoryCount); // Send the result
  // } catch (error) {
  //     res.status(500).send(error);
  // }
  try {
    const itJobs = await JobModel.find({
      categories: "Information Technology (IT)",
    });
    const healthcare = await JobModel.find({ categories: "Healthcare" });
    const education = await JobModel.find({ categories: "Education" });
    const hr = await JobModel.find({ categories: "Human Resources" });
    const ac = await JobModel.find({ categories: "Accountant" });
    const cs = await JobModel.find({ categories: "Customer Service" });
    // const eng=await JobModel.find({categories:'Engineering'});

    res.send({
      itjobs: itJobs,
      itjobslength: itJobs.length,
      healthcare: healthcare,
      healthcarelength: healthcare.length,
      education: education,
      educationlength: education.length,
      hr: hr,
      hrlength: hr.length,
      ac: ac,
      aclength: ac.length,
      cs: cs,
      cslength: cs.length,
    });
  } catch (error) {
    res.status(201).send({
      message: "error occured in fetching jobs",
      error,
    });
  }
};
export const latestJob = async (req, res) => {
  const user = req.user;
  const jobs = await JobModel.find({ postedBy: { $nin: [user._id] } })
    .sort({ createdAt: -1 }) // Sort by createdAt, latest first
    .limit(4) // Limit to 6 results
    .exec(); // Execute the query
  res.send(jobs);
};
export const jobsByCount = async (req, res) => {};
