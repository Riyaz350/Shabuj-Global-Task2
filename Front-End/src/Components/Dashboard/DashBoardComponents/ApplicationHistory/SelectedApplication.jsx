import { useState } from "react";
import SelectedApplicationTable from "./SelectedApplicationTable";

const SelectedApplication = ({ application }) => {
    const studentsInfo = application.studentDetails
    const universityInfo = application.universityData
    const statuses =["Application Submitted", "Application Processed", "Documents Missing", "Conditional offer issued", "Unconditional offer issued", "Application Rejected", "CAS issued", "Tuition paid", "Visa Applied", "Visa issued", "Student Enrolled"]

    const [req, setReq] = useState(1)
    return (
        <div className="">
            <div className="text-xl p-5 pb-0 w-full flex justify-between">
                <h2 >Application Details</h2>
                <div className="flex gap-2">
                    <button className="btn ">Add Comment</button>
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn ">Click</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {statuses.map((status)=>
                                    <li key={status}><a>{status}</a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className=" bg-white w-full ">
                    <div className="flex text-lg gap-5 border-b-2 border-gray-200  p-5 pb-0 w-full">
                        <h2 onClick={() => setReq(1)} className={` p-2  cursor-pointer ${req == 1 ? 'text-purple-400 border-b-2 border-b-purple-400 ' : ''}`}>Student/Course Details</h2>
                        <h2 onClick={() => setReq(2)} className={` p-2  cursor-pointer ${req == 2 ? 'text-purple-400 border-b-2 border-b-purple-400  ' : ''}`}>Uplaod/Download</h2>
                        <h2 onClick={() => setReq(3)} className={` p-2  cursor-pointer ${req == 3 ? 'text-purple-400 border-b-2 border-b-purple-400  ' : ''}`}>Status</h2>
                        <h2 onClick={() => setReq(4)} className={` p-2  cursor-pointer ${req == 4 ? 'text-purple-400 border-b-2 border-b-purple-400  ' : ''}`}>Comments</h2>
                        <h2 onClick={() => setReq(5)} className={` p-2  cursor-pointer ${req == 5 ? 'text-purple-400 border-b-2 border-b-purple-400  ' : ''}`}>University Communication</h2>
                    </div>
                    <div className="p-5 w-full">
                        {
                            req === 1 &&
                            <div className="w-full ">
                                <SelectedApplicationTable prop1={"Application ID"} prop2={application?._id} prop3={'Date Added'} prop4={application?.time} />
                                <SelectedApplicationTable prop1={"Student ID"} prop2={'pFthcipKvH'} prop3={'Student Passport No'} prop4={studentsInfo.passportNo} />
                                <SelectedApplicationTable prop1={"Student Name"} prop2={studentsInfo.firstName + " " + studentsInfo.lastName} prop3={'Student Date of Birth	'} prop4={studentsInfo.birthDate} />
                                <SelectedApplicationTable prop1={"Student E-Mail"} prop2={studentsInfo.studentMail} prop3={'Student Phone No'} prop4={studentsInfo.whatsapp} />
                                <SelectedApplicationTable prop1={"Communication E-Mail "} prop2={studentsInfo.counsellorMail} prop3={'Communication Phone No'} prop4={studentsInfo.counsellorNo} />
                            </div>
                        }
                        {
                            req == 2 &&
                            <div>

                            </div>
                        }
                        {
                            req == 3 &&
                            <div>
                                <table className="table">
                                    <thead>
                                        <th>Date Added</th>
                                        <th>Comment</th>
                                        <th>Status</th>
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <th>{application?.status.time}</th>
                                            <th>{application?.status.status}</th>
                                            <th>{application?.status.status}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            req == 4 &&
                            <div>
                                {application?.comments}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedApplication;