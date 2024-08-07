// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     const { isAuthorized } = useSelector(state => state.user);
//     const [degree, setDegree] = useState();
//     const [tenth, setTenth] = useState();
//     const [twelth, setTwelth] = useState();
//     const [sdegree, setSDegree] = useState();
//     const [stenth, setSTenth] = useState();
//     const [stwelth, setSTwelth] = useState();
//     const [edegree, setEDegree] = useState();
//     const [etenth, setETenth] = useState();
//     const [etwelth, setETwelth] = useState();
//     const { users } = useSelector(state => state.user);
//     const navigate = useNavigate()
//     if (!isAuthorized) {
//         navigate('/')
//     }
//     // useEffect(() => {
//     //     axios.post('http://localhost:4000/api/profile/postInfo', { withCredentials: true }).then((res) => {
//     //         console.log(res.data)
//     //     }).catch((err) => {
//     //         console.log(err)
//     //     })
//     // }, [])
//     const handleonsubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:4000/api/profile/postInfo', { education:{
//             degree:{
//                 startdate:sdegree,
//                 enddate:edegree,
//                 name:degree
//             },
//             tenth:{
//                 startdate:stenth,
//                 enddate:etenth,
//                 name:tenth
//             },
//             twelth:{
//                 startdate:stwelth,
//                 enddate:etwelth,
//                 name:twelth
//             }
//         }
//          }, { withCredentials: true }).then((res) => {
//             console.log(res.data)
//         }).catch((err) => {
//             console.log(err)
//         })
//     }
//     return (<>
//         <form onSubmit={(e)=>handleonsubmit(e)}>
//             education <br /> <br />
//             <label htmlFor="">CollegeName:</label><input type="text" name="degree" onChange={(e) => { setDegree(e.target.value) }} />
//             startDate:<input type="date" name="startdate" id="startdate" onChange={() => { setSDegree(e.target.value) }} />
//             enddate:<input type="date" onChange={() => { setEDegree(e.target.value) }} /><br />
//             <label htmlFor="">schoolName:</label> <input type="text" name="tenth" onChange={(e) => { setTenth(e.target.value) }} />
//             startDate:<input type="date" name="startdate" id="startdate" onChange={() => { setSTenth(e.target.value) }} />
//             enddate:<input type="date" onChange={() => { setETenth(e.target.value) }} /><br />
//             <label htmlFor="">schoolName:</label> <input type="text" name="twelth" onChange={(e) => setTwelth(e.target.value)} />
//             startDate:<input type="date" name="startdate" id="startdate" onChange={() => { setSTwelth(e.target.value) }} />
//             enddate:<input type="date" onChange={() => { setETwelth(e.target.value) }} /><br /><br />

//             <label htmlFor="">comma separated skills</label><input type="skills" placeholder="enter skills" />
//             <button type='submit'>add info</button>
//         </form>

//     </>)

// }
// export default Profile;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { isAuthorized } = useSelector(state => state.user);
    const [degree, setDegree] = useState('');
    const [tenth, setTenth] = useState('');
    const [twelth, setTwelth] = useState('');
    const [sdegree, setSDegree] = useState('');
    const [stenth, setSTenth] = useState('');
    const [stwelth, setSTwelth] = useState('');
    const [edegree, setEDegree] = useState('');
    const [etenth, setETenth] = useState('');
    const [etwelth, setETwelth] = useState('');
    const [skills,setSkills]=useState([]);
    const {users}=useSelector(state=>state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/profile/postInfo', {
            education: {
                degree: {
                    startdate: sdegree,
                    enddate: edegree,
                    name: degree
                },
                tenth: {
                    startdate: stenth,
                    enddate: etenth,
                    name: tenth
                },
                twelth: {
                    startdate: stwelth,
                    enddate: etwelth,
                    name: twelth
                }
            },
            skills:skills.split(',').map((req)=>req.trim()),
        }, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <h1>{users.name}</h1>
                contact Info:<h2>{users.email}</h2>
                <h3>Education</h3>
                <label htmlFor="degree-name">College Name:</label>
                <input
                    type="text"
                    name="degree"
                    id="degree-name"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                />
                <br />
                <label htmlFor="degree-startdate">Start Date:</label>
                <input
                    type="date"
                    name="startdate"
                    id="degree-startdate"
                    value={sdegree}
                    onChange={(e) => setSDegree(e.target.value)}
                />
                <br />
                <label htmlFor="degree-enddate">End Date:</label>
                <input
                    type="date"
                    name="enddate"
                    id="degree-enddate"
                    value={edegree}
                    onChange={(e) => setEDegree(e.target.value)}
                />
                <br /><br />

                <label htmlFor="tenth-name">School Name (10th):</label>
                <input
                    type="text"
                    name="tenth"
                    id="tenth-name"
                    value={tenth}
                    onChange={(e) => setTenth(e.target.value)}
                />
                <br />
                <label htmlFor="tenth-startdate">Start Date:</label>
                <input
                    type="date"
                    name="startdate"
                    id="tenth-startdate"
                    value={stenth}
                    onChange={(e) => setSTenth(e.target.value)}
                />
                <br />
                <label htmlFor="tenth-enddate">End Date:</label>
                <input
                    type="date"
                    name="enddate"
                    id="tenth-enddate"
                    value={etenth}
                    onChange={(e) => setETenth(e.target.value)}
                />
                <br /><br />

                <label htmlFor="twelth-name">School Name (12th):</label>
                <input
                    type="text"
                    name="twelth"
                    id="twelth-name"
                    value={twelth}
                    onChange={(e) => setTwelth(e.target.value)}
                />
                <br />
                <label htmlFor="twelth-startdate">Start Date:</label>
                <input
                    type="date"
                    name="startdate"
                    id="twelth-startdate"
                    value={stwelth}
                    onChange={(e) => setSTwelth(e.target.value)}
                />
                <br />
                <label htmlFor="twelth-enddate">End Date:</label>
                <input
                    type="date"
                    name="enddate"
                    id="twelth-enddate"
                    value={etwelth}
                    onChange={(e) => setETwelth(e.target.value)}
                />
                <br /><br />

                <label htmlFor="skills">Comma Separated Skills:</label>
                <input type="text" id="skills" placeholder="Enter skills" onChange={(e)=>{setSkills(e.target.value)}} />
                <br />
                <button type='submit'>Add Info</button>
            </form>
        </>
    );
};

export default Profile;
