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
                           {Object.entries(details).map(([category, count]) => (

                                   <li key={category}>
                                      <span style={{color:'#078ea3'}}>{category}</span>  <br /><br /> <span style={{marginTop:'20px'}}> ({count} open positions)</span><br/>
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