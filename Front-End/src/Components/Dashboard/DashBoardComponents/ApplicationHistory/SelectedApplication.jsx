import { useContext, useEffect, useState } from "react";
import SelectedApplicationTable from "./SelectedApplicationTable";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { extractDateTime } from '../../../../Tools/timeExtractor'
const SelectedApplication = ({ application }) => {
    const studentsInfo = application?.studentDetails
    const time = extractDateTime()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const statuses = ["Application Submitted", "Application Processed", "Documents Missing", "Conditional offer issued", "Unconditional offer issued", "Application Rejected", "CAS issued", "Tuition paid", "Visa Applied", "Visa issued", "Student Enrolled"]
    const [comment, setComment] = useState('')
    const [req, setReq] = useState(1)
    const [userData, setUserData] = useState(null)
    console.log(userData?.role)
    const addComment = { user: user?.displayName, comment: comment, time: time }

    const submitComment = (id) => {
            axiosPublic.patch(`/applicationPatch/${id}`, addComment)
    }

    const changeStatus = ( id, status) =>{
        const addStatus = {user:user?.displayName, status:status, time:time}
        axiosPublic.patch(`/applicationPatchStatus/${id}`, addStatus)

    }

    useEffect(()=>{
        axiosPublic.get(`/user/${user?.email}`)
        .then(data=>setUserData(data.data))
    },[axiosPublic, user?.email])

    return (
        <div className="">
            <div className="text-xl p-5 pb-0 w-full flex justify-between">
                <h2 >Application Details</h2>
                {userData?.role == 'Admin' | userData?.role == 'ACO'  &&
                <div className="flex gap-2">
                <div>
                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Comment</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box flex justify-center flex-col gap-5">
                            <h2>Write your comment</h2>
                            <input onChange={(e) => setComment(e.target.value)} className="w-full p-5 border-2 border-black rounded-lg" type="text" />
                            <button onClick={() => submitComment(application?._id)} className="btn hover:bg-[#675dd1] hover:text-white mx-auto w-1/3 ">Submit</button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn  ">Change Status</div>
                        <ul tabIndex={0} className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {statuses.map((status) =>
                                <li onClick={()=>changeStatus( application._id, status)}  key={status}><a>{status}</a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
                }
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
                                <SelectedApplicationTable prop1={"Student ID"} prop2={'pFthcipKvH'} prop3={'Student Passport No'} prop4={studentsInfo?.passportNo} />
                                <SelectedApplicationTable prop1={"Student Name"} prop2={studentsInfo?.firstName + " " + studentsInfo?.lastName} prop3={'Student Date of Birth	'} prop4={studentsInfo?.birthDate} />
                                <SelectedApplicationTable prop1={"Student E-Mail"} prop2={studentsInfo?.studentMail} prop3={'Student Phone No'} prop4={studentsInfo?.whatsapp} />
                                <SelectedApplicationTable prop1={"Communication E-Mail "} prop2={studentsInfo?.counsellorMail} prop3={'Communication Phone No'} prop4={studentsInfo?.counsellorNo} />
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
                                            <th>{application?.status?.time}</th>
                                            <th>{application?.status?.status}</th>
                                            <th>{application?.status?.status}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            req == 4 &&
                            <div className="flex flex-col gap-5">
                                {application?.comments?.map((comment, index) =>
                                    <div className="bg-gray-100 p-5 rounded-lg border-2" key={index}>
                                        <h2 className="font-bold">{comment?.time}</h2>
                                        <h2>{comment?.comment}</h2>
                                        <h2>{comment?.user}</h2>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedApplication;