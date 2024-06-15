import {  useEffect, useState } from "react";
import ApplicationHistoryRow from "./ApplicationHistoryRow";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const ApplicationHistory = () => {
    const [applications, setApplications] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        axiosPublic.get('/applications')
        .then(data=>setApplications(data.data))
    })
    return (
        <div className=" overflow-scroll">
            <div className="   bg-white  rounded-lg shadow-lg mx-auto my-5 ">
             <table className="table  overflow-x-scroll ">
                {/* head */}
                <thead>
                    <tr className="text-xl">
                        <th>APPLICATION ID</th>
                        <th>STUDENT NAME</th>
                        <th>UNIVERSITY/COURSE DETAILS</th>
                        <th>STATUS</th>
                        <th>DATE ADDED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                
                <tbody >
                {
                applications.map(application=><ApplicationHistoryRow key={application._id} application={application} applications={applications} setApplications={setApplications}></ApplicationHistoryRow>)
                }
                </tbody>

            </table>
            </div>    
        </div>
    );
};

export default ApplicationHistory;