import { useContext, useEffect, useState } from "react";
import ApplicationHistoryRow from "./ApplicationHistoryRow";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import SelectedApplication from "./SelectedApplication";
import { AuthContext } from "../../../Provider/AuthProvider";

const ApplicationHistory = () => {
    const [applications, setApplications] = useState([])
    const [application, setApplication] = useState({})
    const [userRole, setUserRole] = useState('')
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosPublic.get('/applications')
            .then(data => {
                if (userRole !== 'CP') {
                    setApplications(data?.data)
                } else {
                    setApplications(data?.data.filter(applicant => applicant?.cpMail === user?.email))
                }
            })

        axiosPublic.get(`/user/${user?.email}`)
        .then(data=>setUserRole(data?.data.role))

    },[user?.email, axiosPublic, userRole])
    return (
        <div className=" overflow-scroll bg-white w-full rounded-lg shadow-lg mt-10">
            {Object.keys(application).length ?
                <div className="w-max">
                    <SelectedApplication application={application} />
                </div> :
                <div className="   bg-white w-full  mx-auto my-5 ">
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
                                applications.map(application => <ApplicationHistoryRow key={application._id} application={application} setApplication={setApplication}></ApplicationHistoryRow>)
                            }
                        </tbody>

                    </table>
                </div>
            }
        </div>
    );
};

export default ApplicationHistory;