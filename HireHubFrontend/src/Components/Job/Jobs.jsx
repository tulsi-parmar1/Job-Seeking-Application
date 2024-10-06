import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../module/Jobs.module.css";
import JobLayout from "../Home/JobLayout";
import Loader from "../Layout/Loader";
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState(true);
  //search
  const handlesearch = (e) => {
    const search = e.target.value;
    setSearchQuery(search);
  };
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/job/getAll ", { withCredentials: true })
        .then((res) => {
          setJobs(res.data.jobs);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  }, []);
  if (!isAuthorized) {
    navigate("/login");
  }

  //search
  const filteredJob = searchQuery
    ? jobs.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.jobcontainer}>
          <div className={style.container}>
            <h1>All available jobs</h1>
            <div className={style.inpt}>
              <input
                type="text"
                placeholder="search job"
                onChange={handlesearch}
              />
            </div>
            <JobLayout jobs={filteredJob}></JobLayout>
          </div>
        </div>
      )}
    </>
  );
}
export default Jobs;
