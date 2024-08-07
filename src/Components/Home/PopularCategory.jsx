import axios from "axios";
import { useEffect, useState } from "react";
import { FaSuitcase } from "react-icons/fa";
import style from "../../module/PopularCategories.module.css"
import { FaArrowRightLong } from "react-icons/fa6";

function PopularCategory() {
    const [details, setDetail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/api/job/countCategories', { withCredentials: true })
            .then((res) => {
               setDetail(res.data)
            // console.log(res.data);
            })
            .catch((error) => {
                console.error('Error fetching job counts by category:', error);
            });
    }, []);


    return (
        <>
            <div className={style.categories}>
                <h1>POPULAR CATEGORIES</h1>
                <div className={style.card}>
                    {
                       <div>
                       <ul>
                        {/* ask chatGpt for explaination */}
                           {Object.entries(details).map(([category, count]) => (

                                   <li key={category}>
                                       {count} <br /><br /> <span style={{marginTop:'20px'}}> {category}</span><br/>
                                      <a href={`jobsByCount/:${category}`}> <button className={style.btn}>View Jobs <span></span><FaArrowRightLong className={style.arrow}/></button></a>
                                   </li>

                           ))}
                        
                       </ul>
                   </div>
    
                    }
                </div> 
            </div>
        </>
    )
}
export default PopularCategory;