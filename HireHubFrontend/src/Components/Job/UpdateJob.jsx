import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import style from "../../module/UpdateJob.module.css";

const UpdateJob = () => {
  const [job, setJob] = useState({});
  const { isAuthorized } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the name belongs to the salary range inputs
    if (name === "salaryRange-min") {
      setJob((prevState) => ({
        ...prevState,
        salaryRange: {
          ...prevState.salaryRange,
          min: value,
        },
      }));
    } else if (name === "salaryRange-max") {
      setJob((prevState) => ({
        ...prevState,
        salaryRange: {
          ...prevState.salaryRange,
          max: value,
        },
      }));
    } else {
      // Default handling for other inputs
      setJob((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    if (!isAuthorized) {
      return navigate("/login");
    }
    axios
      .get(`http://localhost:4000/api/job/${id}`, { withCredentials: true })
      .then((res) => {
        const jobData = res.data.job;
        //array to string separated by ,
        setJob({
          ...jobData,
          requirements: jobData.requirements.join(", "),
          responsibilities: jobData.responsibilities.join(", "),
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      });
  }, []);

  const handleUpdate = async (jobId) => {
    try {
      const updateJob = {
        ...job,
        requirements: job.requirements.split(",").map((item) => item.trim()),
        responsibilities: job.responsibilities
          .split(",")
          .map((item) => item.trim()),
      };
      const { data } = await axios.put(
        `http://localhost:4000/api/job/updateJob/${jobId}`,
        updateJob,
        { withCredentials: true }
      );
      alert(data.message);
      navigate("/job/me");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <GrLinkPrevious
        style={{ fontSize: "30px", marginLeft: "100px" }}
        className={style.previous}
        onClick={() => window.history.back()}
      />
      <div className="jobDetail page">
        <div className={style.container}>
          <h1>update Job</h1>
          <div className={style.banner}>
            <p>
              title:{" "}
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={handleInputChange}
              />
            </p>
            <p>
              description:
              <textarea
                type="text"
                name="description"
                value={job.description}
                onChange={handleInputChange}
                rows={6}
              />
            </p>
            <p>
              contact Email:
              <input
                type="text"
                name="contactEmail"
                value={job.contactEmail}
                onChange={handleInputChange}
              />
            </p>
            <p>
              Employeement Time{" "}
              <input
                type="text"
                name="employmentType"
                value={job.employmentType}
                onChange={handleInputChange}
              />
            </p>
            <select
              name="categories"
              value={job.categories}
              onChange={handleInputChange}
            >
              <option value="">Select categories</option>
              <option value="Information Technology (IT)">
                Information Technology (IT)
              </option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
              <option value="Education">Education</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Customer Service">Customer Service</option>
            </select>
            <p>
              Salary:{" "}
              <span>
                {job.salaryRange ? (
                  <>
                    <input
                      type="text"
                      name="salaryRange-min"
                      value={job.salaryRange.min}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="salaryRange-max"
                      value={job.salaryRange.min}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  "N/A"
                )}
              </span>
            </p>
            <p>Requirements: (comma separated)</p>
            <textarea
              type="text"
              name="requirements"
              value={job.requirements}
              onChange={handleInputChange}
              rows={4}
            />
            <p>Responsibilities: (comma separated)</p>
            <textarea
              type="text"
              name="responsibilities"
              value={job.responsibilities}
              onChange={handleInputChange}
              rows={4}
            />
            <button onClick={() => handleUpdate(job._id)}>Update</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateJob;
