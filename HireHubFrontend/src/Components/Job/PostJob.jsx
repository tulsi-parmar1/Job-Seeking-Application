
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useNavigate } from "react-router-dom";
import style from "../../module/PostJob.module.css"
import Loader from "../Layout/Loader";

function PostJob() {
 
  const navigate=useNavigate();
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
  const [logo,setLogo]=useState(null);
  const [loader,setLoader]=useState(false);
  const { isAuthorized } = useSelector((state) => state.user);
  const {users}=useSelector(state=>state.user);
  
  const handleJobPost = async (e) => {
    setLoader(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categories', categories);
    formData.append('company', company);
    formData.append('location', location);
    formData.append('employmentType', employmentType);
    formData.append('salaryRangeMin', salaryMin);
    formData.append('salaryRangeMax', salaryMax);
    formData.append('requirements', requirements);
    formData.append('responsibilities', responsibilities);
    formData.append('deadline', deadline);
    formData.append('contactEmail', contactEmail);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/job/postJob",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
      );
      toast.success(data.message);
      navigate('/job/me');
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };

const handlefilechange=(e)=>{
 const logo2= e.target.files[0];
 setLogo(logo2);
}
    useEffect(()=>{
      if (!isAuthorized) {
        navigate("/login");
        return null; // Ensure the component doesn't render before navigation
      }
      if(!users.role || users.role!="recruiter")
        {
            navigate('/recruiterlogin');
    
        }
    },[])
  return (
    <>
  
    <div className={style.job_post_page}>
   
      <div className={style.container}>
        <h1>Post a job for free </h1>
        {/* <p>increase the quality of you hire</p> */}
        <p style={{marginTop:'8px'}}>increase your company's potential with one job post</p>
        <form onSubmit={handleJobPost} className={style.formm}>
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

              <option value="Education">Education</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Customer Service">Customer Service</option>
        
              <option value="Accountant">Accountant</option>
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
          
         <div className="logo">
          <p>Comapny Logo: </p> <br />
           <input type="file" name="logo" onChange={handlefilechange}/>
          </div>
          <div className={style.btn}>
          <button type="submit">Create Job <span className={`${loader && style.loading}`}></span></button>
          </div>
        </form>
      </div>
    </div>
    </>
  );

}

export default PostJob;
