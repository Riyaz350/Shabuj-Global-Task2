import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { LuUser } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { RiMenuFill } from "react-icons/ri";
import { IoCloudUploadOutline, IoExitOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Dashboard = () => {
    const [mid, setMid] = useState(false)
    const { logOut } = useContext(AuthContext)

    const active = 'flex items-center gap-3 font-semibold bg-[#675dd1] p-4 py-2 text-lg hover:bg-[#675dd1] w-full border-[#ffffff] text-[#ffffff] rounded-lg '
    const inActive = 'flex items-center gap-3  shadow-none p-4 py-2 text-lg  text-gray-300 font-semibold  w-full     border-transparent rounded-lg hover:bg-[#383c52]   hover:text-[#ffffff]'


    useEffect(() => {
        if (window.innerWidth < 1280) {
            setMid(true)
        } else {
            return
        }
    }, [setMid])

    return (
        <div className="w-full">
            <div className="flex">
                {/* sidebar */}
                <div className="z-[100]">
                    <div className={`${mid ? "drawer " : "drawer-open"}`}>
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                        <div className="drawer-side ">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 text-2xl w-fit min-h-full space-y-2 text-white font-bold  bg-[#30344c]">
                                {/* Sidebar content here */}
                                <li><h2 >Shabuj Global</h2></li>
                                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? active : inActive} to="/adminDashBoard"><FaRegEnvelopeOpen />Dashboard</NavLink>
                                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? active : inActive} to="/newApplication"><MdOutlineDashboardCustomize className="text-2xl" />New Application</NavLink>
                                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? active : inActive} to="/applicationHistory"><MdOutlineDashboardCustomize className="text-2xl" />Application History</NavLink>
                                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? active : inActive} to="/upload"><IoCloudUploadOutline className="text-2xl" />Upload University Data</NavLink>
                            </ul>

                        </div>
                    </div>
                </div>

                {/* main dashboard */}
                <div className="flex-1 p-10 bg-[#f8f7fa]">
                    <div className="flex justify-between w-full shadow-lg p-5 rounded-lg bg-white">
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <label htmlFor="my-drawer-2" className={`${mid ? "flex" : " invisible "} text-3xl drawer-button`}><RiMenuFill /></label>
                        </div>
                        <div className="text-3xl  flex">
                            <p className="w-fit rounded-full p-1"><CiBellOn /></p>
                            <div className="dropdown dropdown-end">
                                <p tabIndex={0} role="button" className=" bg-purple-200 w-fit rounded-full p-1"><LuUser /></p>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52">
                                    <li className="w-full flex items-center flex-row p-5 border-b-[1px] border-gray-300">
                                        <p tabIndex={0} role="button" className="text-3xl bg-purple-200 w-fit rounded-full p-1"><LuUser /></p>
                                        <p>admin</p>
                                    </li>
                                    <li>
                                        <p className="text-lg"><LuUser className="pr-2 text-3xl" /> Profile</p>
                                        <button onClick={() => logOut()} className="bg-red-500 text-center flex justify-center font-bold text-white">Logout <IoExitOutline className="text-2xl" /> </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Outlet></Outlet>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;