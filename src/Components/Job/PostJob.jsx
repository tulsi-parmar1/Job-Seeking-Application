
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [categories, setCategories] = useState('');
  const { isAuthorized } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/job/postJob",
        {
          title,
          description,
          categories,
          company,
          location,
          employmentType,
          salaryRange: { min: salaryMin, max: salaryMax },
          requirements: requirements.split(",").map((req) => req.trim()),
          responsibilities: responsibilities.split(",").map((res) => res.trim()),
          deadline,
          contactEmail,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      navigate('/job/me');
    } catch (error) {
      
      toast.error(error.response.data.message);

    }
  };


  if (!isAuthorized) {
    navigate("/login");
    return null; // Ensure the component doesn't render before navigation
  }

  return (
    <div className="job_post page">
      <div className="container">
        <h3>Post new Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
          </div>
          <div className="wrapper">
            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            >
              <option value="">Select categories</option>
              <option value="Information Technology (IT)">Information Technology (IT)</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
              <option value="Education">Education</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location/Address"
            />
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              placeholder="Employment Type"
            />
          </div>
          <div className="wrapper">
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="Salary Min"
            />
          </div>
          <div className="wrapper">
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="Salary Max"
            />
          </div>
          <div className="wrapper">
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Requirements (comma-separated)"
            />
          </div>
          <div className="wrapper">
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Responsibilities (comma-separated)"
            />
          </div>
          <div className="wrapper">
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Contact Email"
            />
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="dedline"
            />
          </div>
          <div className="wrapper">
            <input type="checkbox" checked={deadline} onChange={(e) => setDeadline(e.target.checked)} />
          </div>
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
