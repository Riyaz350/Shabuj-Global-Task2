import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import logInCover from '../../assets/login-cover-image.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const LogIn = () => {
    const {user, signInUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    const [errors, setErrors] = useState([])
    const [selected, setSelected] = useState(0)
    const [pass, setPass] = useState(0)


    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"
    const labelStyle = "label-text text-[#0d3454]" 

    const addError = (e)=>{
        setErrors(prevErrors => [...prevErrors, e]);
    }

    const Field =  ()=>{
        return(<div className="label">
        <span className="label-text text-red-500">This field is required</span>
    </div>)
    }
    const Label =({text,ind})=>{
        return(<div className="label">
        <span className={errors.includes(parseInt(ind)) ? "label-text text-red-500" :  selected == parseInt(ind) ? "label-text text-purple-500": "label-text text-black-500"}>{text}</span>
    </div>)
    }
    
    // Email password sign in
    const handleSignIn = e =>{
        e.preventDefault()
        signInUser(email, password)
        .then(()=>{    
            
                Swal.fire({position: "top-end", icon: "success", title: "Welcome to Shabuj Global", showConfirmButton: false, timer: 1500});
                e.target.reset()
                navigate('/channelPartnerDashboard')
                location.reload()
            
            })
        .catch((error)=>{
            console.log(error)
            if(error){
                Swal.fire({position: "top-end", icon: "error", title: "Wrong Credentials", showConfirmButton: false, timer: 1500});
            }
        })
    }

    return (
        <div className=" bg-[#f8f7fa] grid grid-cols-3 items-center" >
            <div className=" p-20 col-span-2 hidden lg:flex">
                <img src={logInCover} alt="" />
            </div>

            <div  className="    bg-white col-span-1">
                <div className={"text-black w-3/4 light-home flex flex-col items-start justify-center rounded-3xl mx-auto min-h-screen my-auto py-10   "}>
                    <div className=" ">
                    <h1 className="text-3xl mb-2 lg:text-2xl   ">Welcome to Shabuj Global! 👋🏻 </h1>
                    <p className="text-base w-full">Please sign-in to your account and start the adventure</p>
                    </div>
                    <div className="bg-white   w-full">
                    <form onSubmit={handleSignIn} className="bg-white ">

                    <div className="form-control w-full">
                        <Label ind={"3"} text="Email  *"  />
                        <input onFocus={()=>setSelected(3)} onBlur={()=>{setSelected(0)
                            !email && addError(3)}} onChange={e=>{setSelected(3)
                                setErrors((prevItems) => prevItems.filter(item => item !== 3))
                            setEmail(e.target.value)}} type="text"  placeholder="Email" className={` ${`${errors?.includes(3) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}   />
                        {errors.includes(3) ? <Field/> : <></>}
                        </div>


                        <div className="form-control w-full">
                        <Label ind={"4"} text="Password  *"  />
                        <div className={`flex items-center    gap-5 ${`${errors?.includes(4) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}>
                            <input onFocus={()=>setSelected(4)} onBlur={()=>{setSelected(0)
                                !password && addError(4)}} className="w-full" onChange={e=>{setSelected(4)
                                    setErrors((prevItems) => prevItems.filter(item => item !== 4))
                            setPassword(e.target.value)}} type={pass?"text" :"password"}  placeholder="Password"    />
                        <div className="cursor-pointer justify-end flex" onClick={()=>setPass(!pass)}>
                        {pass?<p><FaRegEyeSlash /></p>:
                        <p><FaRegEye /></p>}
                        </div>
                        </div>
                        {errors.includes(4) ? <Field/> : <></>}
                        </div>
                        <div className="form-control mt-4">
                        <button className="btn  bg-[#7367f0] text-xl text-white font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Login</button>
                        </div>
                            
                        <div className="space-y-5 mt-5">
                        <p className="text-center ">New on our platform? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link></p>
                        </div>
                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;