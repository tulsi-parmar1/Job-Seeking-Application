import style from "../../module/JobType.module.css";
import { FaSuitcase } from 'react-icons/fa';
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
const JobType=()=>{
    const mainRef=useRef();
    const textRef=useRef();
    // useEffect(()=>{

    //     gsap.fromTo(
    //         mainRef.current.querySelectorAll(`.${style.jobtype}`),
    //         { opacity: 0,x:20},
    //         {
    //             opacity: 1,
    //             x:0,
    //             duration: 1,
    //             stagger: 0.1, 
    //             scrollTrigger: {
    //                 trigger: mainRef.current,
    //                 start: "top 70%",
    //             }
    //         }
    //     ),
    //     gsap.fromTo(
    //        textRef.current,
    //         { opacity: 0,x:90},
    //         {
    //             opacity: 1,
    //             x:0,
    //             duration: 1,
    //             stagger: 0.2, 
    //             scrollTrigger: {
    //                 trigger: textRef.current,
    //                 start: "top 70%",
    //             }
    //         }
    //     );
    // },[])
    const details = [
        { id: 1, title: '1,23,442', subTitle: 'Full-time', icon: <FaSuitcase  /> },
        { id: 2, title: '2,34,555', subTitle: 'Remote Job', icon: <FaSuitcase  /> },
        { id: 3, title: '3,45,678', subTitle: 'Internship', icon: <FaSuitcase  /> },
        { id: 4, title: '4,56,789', subTitle: 'Contract Job', icon: <FaSuitcase /> },
        { id: 5, title: '5,67,890', subTitle: 'Part-time Job', icon: <FaSuitcase /> },
    ];
    return(
       
        <>
        <div className={style.main2} ref={mainRef}>
                <h1 className={style.h11} ref={textRef}>Current Job Listings by Type</h1>
                <div className={style.main} >
                    {
                        details.map(element => {
                            return <div key={element.id} className={style.jobtype}>
                                <span className={style.icon}>
                                    {element.icon}
                                </span>
                                <div className={style.info}>
                                   <p>{element.subTitle}</p>
                                    <p style={{fontSize:'15px'}} className={style.ptag}>{element.title}</p>
                                  
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default JobType;
