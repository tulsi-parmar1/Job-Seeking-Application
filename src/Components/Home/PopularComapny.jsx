import { FaBuilding } from "react-icons/fa";

function PopularCompany(){
    const companies=[
    { id: 1, title: 'Tech Innovators Inc.', location: 'San Francisco, CA', openPositions: 15, icon: <FaBuilding /> },
    { id: 2, title: 'Data Solutions Ltd.', location: 'New York, NY', openPositions: 10, icon: <FaBuilding /> },
    { id: 3, title: 'Creative Designs LLC', location: 'Austin, TX', openPositions: 8, icon: <FaBuilding /> },
    { id: 4, title: 'AI Ventures', location: 'Seattle, WA', openPositions: 20, icon: <FaBuilding /> }]
    return (
        <>
       <div className="companies">
        <div className="container">
            <h3>TOP COMAPNIES</h3>
            <div className="banner">
                {
                    companies.map(job=>{
                        return <div className="card" key={job.id}>
                            <div className="content">
                                <div className="icon">{job.icon}</div>
                                <div className="text">
                                    <p>{job.title}</p>
                                    <p>{job.location}</p>
                                </div>
                            </div>
                            <button>Open Posution {Element.openPositions}</button>
                        </div>
                    })
                }
            </div>
        </div>
       </div>
        </>
    )
}
export default PopularCompany;