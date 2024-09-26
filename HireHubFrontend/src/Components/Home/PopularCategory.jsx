
//DESIGN___1

// import axios from "axios";
// import { useEffect, useReducer, useRef, useState } from "react";
// import { FaSuitcase } from "react-icons/fa";
// import style from "../../module/PopularCategories.module.css"
// import { FaArrowRightLong } from "react-icons/fa6";
// import {useGSAP} from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);
// function PopularCategory() {
//     const [details, setDetail] = useState('');
//     const gsapRef=useRef();
//     useEffect(() => {
//         axios.get('http://localhost:4000/api/job/countCategories', { withCredentials: true })
//             .then((res) => {
//                setDetail(res.data)
//             // console.log(res.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching job counts by category:', error);
//             });
//     }, []);
//     useGSAP(()=>{

//         gsap.fromTo(
//             gsapRef.current,
//             { opacity: 0, y: 50 },
//             {
//                 opacity: 1,
//                 y: 0,
//                 duration: 2,
//                 scrollTrigger: {
//                     trigger: gsapRef.current,
//                     start: "top 80%",
//                     // end: "top 30%",
//                     // scrub: true,
//                 }
//             }
//         );
//     })

//     return (
//         <>
//             <div className={style.categories}>
//                 <h1>BROWSE BY CATEGORIES</h1>
//                 <div className={style.card} ref={gsapRef}>
//                     {
//                        <div>
//                        <ul>
//                            {Object.entries(details).map(([category, count]) => (

//                                    <li key={category}>
//                                       <span style={{color:'#078ea3'}}>{category}</span>  <br /><br /> <span style={{marginTop:'20px'}}> ({count} open positions)</span><br/>
//                                       <a href={`jobsByCount/:${category}`}> <button className={style.btn}>View Jobs <span></span><FaArrowRightLong className={style.arrow}/></button></a>
//                                    </li>
//                            ))}
//                        </ul>
//                    </div>
//                     }
//                 </div> 
//             </div>
//         </>
//     )
// }
// export default PopularCategory;

//Design ---->2

// import axios from "axios";
// import { useEffect, useReducer, useRef, useState } from "react";
// import { FaSuitcase } from "react-icons/fa";
// import style from "../../module/PopularCategories.module.css"
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useGSAP } from "@gsap/react";
// import { IoBookSharp } from "react-icons/io5";
// import { FaLaptopCode } from "react-icons/fa";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { MdCastForEducation } from "react-icons/md";
// import { TbRibbonHealth } from "react-icons/tb";
// import { MdManageAccounts } from "react-icons/md";

// gsap.registerPlugin(ScrollTrigger);
// function PopularCategory() {
//     const [itl, setitl] = useState('');
//     const [edl, setedl] = useState('');
//     const [acl, setacl] = useState('');
//     const [healthcarel, sethealthcarel] = useState('');
//     const [hrl, sethrl] = useState('');
//     const [csl,setcsl]=useState('');
//     const gsapRef = useRef();
//     useEffect(() => {
//         axios.get('http://localhost:4000/api/job/countCategories', { withCredentials: true })
//             .then((res) => {
//                 setitl(res.data.itjobslength);
//                 setedl(res.data.educationlength);
//                 setacl(res.data.aclength);
//                 sethealthcarel(res.data.healthcarelength);
//                 sethrl(res.data.hrlength);
//                 setcsl(res.data.cslength);
//             })
//             .catch((error) => {
//                 console.error('Error fetching job counts by category:', error);
//             });
//     }, []);
//     useGSAP(() => {

//         gsap.fromTo(
//             gsapRef.current,
//             { opacity: 0, y: 50 },
//             {
//                 opacity: 1,
//                 y: 0,
//                 duration: 2,
//                 stagger: 0.2,
//                 scrollTrigger: {
//                     trigger: gsapRef.current,
//                     start: "top 80%",
//                     // end: "top 30%",
//                 }
//             }
//         );
//     })

//     return (
//         <>
//         <div className={style.maincont}  ref={gsapRef}>
//            <h1 style={{paddingLeft:'60px',textAlign:'center',marginTop:'50px'}}>Most popular categories</h1>
//             <div className={style.container}>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px'}} className={style.first}><FaLaptopCode /></div>
//                     <div style={{marginLeft:'12px'}}>
//                         <h3>Information technology</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{itl} open positions</p>
                      
//                     </div>
//                     {/* <div>
//                     <button>View Jobs</button>
//                     </div> */}
//                 </div>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px' }} className={style.second}>   <IoBookSharp /></div>
//                     <div>
//                         <h3>Education</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{edl} open positions</p>
//                     </div>

//                 </div>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px' }} className={style.third}> <MdCastForEducation /></div>
//                     <div>
//                         <h3>Account</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{acl} open positions</p>
//                     </div>

//                 </div>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px' }} className={style.fourth}> <TbRibbonHealth /></div>
//                     <div>
//                         <h3>healthcare</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{healthcarel} open positions</p>
//                     </div>

//                 </div>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px' }} className={style.fifth}>    <MdManageAccounts /></div>
//                     <div>
//                         <h3>Human Resource</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{hrl} open positions</p>
//                     </div>

//                 </div>
//                 <div className={style.categories}>
//                     <div style={{ fontSize: '60px' }} className={style.sixth}>    <MdManageAccounts /></div>
//                     <div>
//                         <h3>Customer Service</h3>
//                         <p style={{ fontSize: '16px',color:'rgb(97, 94, 94)' }}>{csl} open positions</p>
//                     </div>

//                 </div>
//             </div>
//             </div>


//         </>
//     )
// }
// export default PopularCategory;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaLaptopCode } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { MdCastForEducation, MdManageAccounts } from "react-icons/md";
import { TbRibbonHealth } from "react-icons/tb";
import style from "../../module/PopularCategories.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PopularCategory() {
    const [itl, setItl] = useState('');
    const [edl, setEdl] = useState('');
    const [acl, setAcl] = useState('');
    const [healthcarel, setHealthcarel] = useState('');
    const [hrl, setHrl] = useState('');
    const [csl, setCsl] = useState('');


    const containerRef = useRef();
    const textRef=useRef();
    useEffect(() => {
        axios.get('http://localhost:4000/api/job/countCategories', { withCredentials: true })
            .then((res) => {
                setItl(res.data.itjobslength);
                setEdl(res.data.educationlength);
                setAcl(res.data.aclength);
                setHealthcarel(res.data.healthcarelength);
                setHrl(res.data.hrlength);
                setCsl(res.data.cslength);
            })
            .catch((error) => {
                console.error('Error fetching job counts by category:', error);
            });
    }, []);

    useEffect(() => {
    
        gsap.fromTo(
            containerRef.current.children,
            { opacity: 0, x:50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        )
        // gsap.fromTo(
        //     textRef.current,
        //     { opacity: 0, x:100 },
        //     {
        //         opacity: 1,
        //         x: 0,
        //         duration: 1,
        //         stagger: 0.2,
        //         scrollTrigger: {
        //             trigger: textRef.current,
        //             start: "top 80%",
        //         }
        //     }
        // );
    }, []);

    return (
        <div className={style.maincont}  ref={textRef}>
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Most popular categories</h1>
            <div className={style.container} ref={containerRef}>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><FaLaptopCode /></div>
                    <div style={{ marginLeft: '12px' }}>
                        <h3>Information technology</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{itl} open positions</p>
                    </div>
                </div>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><IoBookSharp /></div>
                    <div>
                        <h3>Education</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{edl} open positions</p>
                    </div>
                </div>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><MdCastForEducation /></div>
                    <div>
                        <h3>Account</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{acl} open positions</p>
                    </div>
                </div>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><TbRibbonHealth /></div>
                    <div>
                        <h3>Healthcare</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{healthcarel} open positions</p>
                    </div>
                </div>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><MdManageAccounts /></div>
                    <div>
                        <h3>Human Resource</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{hrl} open positions</p>
                    </div>
                </div>
                <div className={style.categories}>
                    <div style={{ fontSize: '60px' }}><MdManageAccounts /></div>
                    <div>
                        <h3>Customer Service</h3>
                        <p style={{ fontSize: '16px', color: 'rgb(97, 94, 94)' }}>{csl} open positions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCategory;
