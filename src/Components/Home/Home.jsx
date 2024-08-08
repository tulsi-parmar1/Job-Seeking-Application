import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategory"
import PopularCompany from "./PopularComapny"
import { useEffect } from "react";
import JobType from "./JobType";
import LatestJob from "./LatestJob";
function Home(){
    const {isAuthorized}=useSelector(state=>state.user);
    console.log(isAuthorized);
    const navigate=useNavigate();
    useEffect(() => {
        if (!isAuthorized) {
          navigate('/login');
        }
      }, [isAuthorized, navigate]);
    
    return (
        <>
        {/* <button>hey</button> */}
            <HeroSection></HeroSection>
            {/* <HowItWorks></HowItWorks> */}
            <JobType></JobType>
            <LatestJob></LatestJob>
            {/* <PopularCompany></PopularCompany> */}
        </>
    )
}
export default Home;