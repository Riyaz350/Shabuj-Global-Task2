import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2'

const ApplicationHistoryRow = ({ application,  setApplication }) => {

    const axiosPublic = useAxiosPublic()

    const studentsInfo = application.studentDetails
    const universityInfo = application.universityData

    const thStyle = "font-normal text-base"

    const handleDelete =(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/application/${id}`)
        .then((data)=>{
            if(data.status == 200){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                location.reload()
            }
        })
              
            }
          });
        
    }

    const handleSearch=(id)=>{
        axiosPublic.get(`/application/${id}`)
        .then((data)=>setApplication(data.data))
    }
    return (
        <tr className="border-b-[1px] font-thin border-gray-300  rounded-lg ">
            <th className={thStyle}>{application?._id}</th>
            <th className={thStyle}>{studentsInfo.firstName}{" "}{studentsInfo.lastName}</th>
            <th className={thStyle}>
                <ul>
                    <li>{universityInfo?.uni}</li>
                    <li>{universityInfo?.course}</li>
                    <li>{universityInfo?.season}</li>
                </ul>
            </th>
            <th className={thStyle}><p className="bg-[#e8e6fc] text-center rounded-lg text-[#887df3] font-semibold">Pending</p></th>
            <th className={thStyle}>{application?.time}</th>
            <th>
                <ul className="space-y-5 text-xl">
                    <li className="cursor-pointer" onClick={()=>handleSearch(application._id)}><IoEyeOutline /></li>
                    <li className="cursor-pointer" onClick={()=>handleDelete(application._id)}><RiDeleteBin6Line /></li>
                </ul>
            </th>
            
        </tr>
    );
};

export default ApplicationHistoryRow;