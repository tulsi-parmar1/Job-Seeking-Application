import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import JobLayout from "../Home/JobLayout";
function CategoryJobs() {
  const [itJobs, setitJobs] = useState([]);
  const [healthcareJobs, setHealthcareJobs] = useState([]);
  const [educationJobs, setEducationJobs] = useState([]);
  const [hrJobs, setHrJobs] = useState([]);
  const [accountantJobs, setAccountantJobs] = useState([]);
  const [csJobs, setCsJobs] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/job/countCategories", {
        withCredentials: true,
      })
      .then((res) => {
        setitJobs(res.data.itjobs);
        setHealthcareJobs(res.data.healthcare);
        setEducationJobs(res.data.education);
        setHrJobs(res.data.hr);
        setAccountantJobs(res.data.ac);
        setCsJobs(res.data.cs);
      })
      .catch((error) => {
        console.error("Error fetching job counts by category:", error);
      });
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Category wise Jobs
      </h1>
      {category === "information technology" && (
        <JobLayout jobs={itJobs}></JobLayout>
      )}
      {category === "education" && <JobLayout jobs={educationJobs}></JobLayout>}
      {category === "human resource" && <JobLayout jobs={hrJobs}></JobLayout>}
      {category === "healthcare" && (
        <JobLayout jobs={healthcareJobs}></JobLayout>
      )}
      {category === "account" && <JobLayout jobs={accountantJobs}></JobLayout>}
      {category === "customer service" && <JobLayout jobs={csJobs}></JobLayout>}
    </div>
  );
}

export default CategoryJobs;
