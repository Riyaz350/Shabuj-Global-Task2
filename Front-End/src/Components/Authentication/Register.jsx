import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link,  useNavigate } from "react-router-dom";
import {  updateProfile } from "firebase/auth";
import auth from "../../../firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import './formStyle.css'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Register = () => {
    const axiosPublic = useAxiosPublic()
    const [firstName, setFirstName] =useState("")
    const [lastName, setLastName] =useState("")
    const [number, setNumber] =useState('')
    const [whatsapp, setWhatsApp] =useState('')
    const [website, setWebsite] =useState('')
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [company, setCompany] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [post, setPost] = useState("")
    const [country, setCountry] = useState("")
    const [errors, setErrors] = useState([])
    const [pass, setPass] = useState(0)
    const [selected, setSelected] = useState(0)
    const [countries, setCountries] = useState([]);
    const items = ['Nigeria', 'India', 'Bangladesh', 'Nepal', 'Bhutan', 'Ghana', 'Sri Lanka'];

    const navigate = useNavigate()
    const {createUser, logOut} =useContext(AuthContext)

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

    const handleItemClick = (index) => {
        if (countries.includes(index)) {
          setCountries(countries.filter((item) => item !== index));
        } else {
          setCountries([...countries, index]);
        }
      };
     

    const throwError = ()=>{
        Swal.fire({ icon: "error", title: "Registration Failed", text: "An unexpected error occurred        " });    }

        const handleEmailRegister = e=>{
            e.preventDefault()
            if(!firstName){
                addError(1)
                throwError()
            }if(!lastName){
                addError(2)
                throwError()    
            }if(!email){
                addError(3)
                throwError()
            }if(!password){
                addError(4)
                throwError()
            }if(!rePassword){
                addError(5)
                throwError()
            }if(!company){
                addError(6)
                throwError()
            }if(!address){
                addError(7)
                throwError()
            }if(!city){
                addError(8)
                throwError()
            }if(!post){
                addError(9)
                throwError()
            }if(!country){
                addError(10)
                throwError()
            }else if(password !== rePassword){
                throwError()
            }else{

                createUser( email, password)
                .then(()=>{
                Swal.fire({position: "top-end", icon: "success", title: "Registration Successful", showConfirmButton: false, timer: 1500});
                const userInfo = {email:email, firstName:firstName,lastName:lastName, number:number,whatsapp:whatsapp, website:website,company:company, countries:countries,  role:'user'}
                axiosPublic.post('/users', userInfo )
                    .then(result=>console.log(result))
                    .catch(error => console.log(error.message))
                    updateProfile(auth.currentUser, { displayName: firstName+" "+lastName }).catch(
                    (err) => console.log(err))
                    navigate('/logIn')
                })
                .catch(e =>{
                    if(e.message == 'Firebase: Error (auth/email-already-in-use).'){
                        Swal.fire({position: "top-end", icon: "error", title: "This Email is already in use", showConfirmButton: false, timer: 1500});
                    } 
                })
            
            }
        }
    return (
        <div className="">
        <div  className=" bg-gray-100 min-h-screen py-14 ">
            <div className={"text-black light-home bg-white lg:mx-36 rounded-lg  py-10 px-5 lg:px-20 lg:py-14 "}>
                <div className="text-center ">
                <h1 className="text-3xl mb-10 lg:text-2xl text-left font-semibold ">Registration Form </h1>
                </div>
                <div className="bg-white rounded-xl">
                <form onSubmit={handleEmailRegister} className="bg-white flex flex-col gap-5">

                    {/* Personal info */}

                    {/* Name */}
                    <div >
                    <h1 className="font-bold mt-10">Personal Information</h1>
                        <div className="lg:flex   gap-5 ">
                        <div className="form-control w-full ">
                        <Label ind={"1"} text="First Name  *"/>
                        <input onFocus={()=>setSelected(1)} onBlur={()=>{ setSelected(0)
                            !firstName && addError(1)}} onChange={e=>{setSelected(1)
                                setErrors((prevItems) => prevItems.filter(item => item !== 1)) 
                            setFirstName(e.target.value)}} type="text"  placeholder="First Name" className={`${errors?.includes(1) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                        {errors.includes(1) ? <Field/> : <></>}
                        </div>

                        <div className="form-control w-full">
                        <Label ind={"2"} text="Last Name  *"  />
                        <input onFocus={()=>setSelected(2)} onBlur={()=>{setSelected(0)
                            !lastName && addError(2)}} onChange={e=>{setSelected(2)
                                setErrors((prevItems) => prevItems.filter(item => item !== 2))
                            setLastName(e.target.value)}} type="text"  placeholder="Last Name" className={`${errors?.includes(2) ? 'border-2 border-red-500 focus:border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle} }`} />
                        {errors.includes(2) ? <Field/> : <></>}
                        </div>
                        </div>
                    </div>

                    {/* Email & numbers */}
                    <div className="lg:flex  gap-5">
                        <div className="form-control w-full">
                        <Label ind={"3"} text="Email  *"  />
                        <input onFocus={()=>setSelected(3)} onBlur={()=>{setSelected(0)
                            !email && addError(3)}} onChange={e=>{setSelected(3)
                                setErrors((prevItems) => prevItems.filter(item => item !== 3))
                            setEmail(e.target.value)}} type="text"  placeholder="Email" className={` ${`${errors?.includes(3) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}   />
                        {errors.includes(3) ? <Field/> : <></>}
                        </div>

                        <div className="form-control w-full">
                        <label className="label">
                            <span className={labelStyle}>Mobile No</span>
                        </label>
                        <input onFocus={()=>setSelected(0)} onBlur={()=>setSelected(0)}  onChange={e=>setNumber(e.target.value)} type="text"  placeholder="Enter your mobile number" className={inputStyle}   />
                        </div><div className="form-control w-full">
                        <label className="label">
                            <span className={labelStyle}>Whatsapp No</span>
                        </label>
                        <input onFocus={()=>setSelected(0)} onBlur={()=>setSelected(0)} onChange={e=>setWhatsApp(e.target.value)} type="text"  placeholder="Enter your whatsapp number" className={inputStyle}   />
                        </div>

                        
 
                        
                    </div>

                    {/* Password */}
                    <div className="lg:flex  gap-5">
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
                        
                        <div className="form-control w-full">
                        <Label ind={"5"} text="Confirm Password  *"  />
                        <div className={`flex items-center    gap-5 ${`${errors?.includes(5) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}>
                            <input onFocus={()=>setSelected(5)} onBlur={()=>{setSelected(0)
                                !rePassword && addError(5)}} className="w-full" onChange={e=>{setSelected(5)
                                    setErrors((prevItems) => prevItems.filter(item => item !== 5))
                            setRePassword(e.target.value)}} type={pass ?"text" : "password" }  placeholder="Confirm Password"    />
                        <div className="w-fit" onClick={()=>setPass(!pass)}>
                            {pass?<p><FaRegEyeSlash /></p >:
                            <p><FaRegEye /></p>}
                        </div>
                        </div>  
                        {errors.includes(5) ? <Field/> : <></>}
                        {rePassword && password !== rePassword && <p className="text-red-500">The Confirm Password field confirmation does not match</p>}

                        </div>
                    </div>

                    <div >
                    <h1 className="font-bold mt-10">Company Details</h1>
                    <div className="lg:flex  gap-5 text-sm">
                    <div className="form-control w-full">
                    <Label ind={"6"} text="Company Name  *"  />
                    <input onFocus={()=>setSelected(6)} onBlur={()=>{setSelected(0)
                        !company && addError(6)}} onChange={e=> {setSelected(6)
                            setErrors((prevItems) => prevItems.filter(item => item !== 6))
                        setCompany(e.target.value)}} type="text" placeholder="Company Name" className={`${errors?.includes(6) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}   />
                    {errors.includes(6) ? <Field/> : <></>}
                    </div>
                    
                    <div className="form-control w-full">
                    <label className="label">
                        <span className="text-black">Website</span>
                    </label>
                    <input onFocus={()=>setSelected(9)} onChange={e=> setWebsite(e.target.value)} type="text" placeholder="Website" className={inputStyle}   />
                    
                    </div>
                    </div>

                    </div>

                    <div >
                    <div className="lg:flex  gap-5 text-sm">
                    <div className="form-control w-full">
                    <Label ind={7} text="Address  *"  />
                    <input onFocus={()=>setSelected(7)} onBlur={()=>{setSelected(0)
                        !address && addError(7)}} onChange={e=> {setSelected(7)
                            setErrors((prevItems) => prevItems.filter(item => item !== 7))
                        setAddress(e.target.value)}} type="address" placeholder="Address" className={`${errors?.includes(7) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}   />
                    {errors.includes(7) ? <Field/> : <></>}
                    </div>
                    
                    <div className="form-control w-full">
                    <Label ind={"8"} text="City  *"  />
                    <input onFocus={()=>setSelected(8)} onBlur={()=>{setSelected(0)
                        !city && addError(8)}} onChange={e=> {setSelected(8)
                            setErrors((prevItems) => prevItems.filter(item => item !== 8))
                        setCity(e.target.value)}} type="text" placeholder="City" className={`${errors?.includes(8) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}   />
                    {errors.includes(8) ? <Field/> : <></>}
                    </div>
                    </div>

                    </div>

                    <div >
                        
                    <div className="lg:flex  gap-5 text-sm items-center">

                    <div className="form-control w-full">
                    <Label ind={"9"} text="Post Code  *"  />
                    <input onFocus={()=>setSelected(9)} onBlur={()=>{setSelected(0)
                        !post && addError(9)}} onChange={e=> {setSelected(9)
                            setErrors((prevItems) => prevItems.filter(item => item !== 9))
                        setPost(e.target.value)}} type="text" placeholder="Post Code" className={`${errors?.includes(9) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}   />
                    {errors.includes(9) ? <Field/> : <></>}
                    </div>
                    
                    <div className="dropdown dropdown-top w-full">
                    <Label ind={10} text="Country  *"  />
                    <select onFocus={()=>setSelected(10)} onBlur={()=>{setSelected(0)
                        !country && addError(10)}} className={`${errors?.includes(10) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`} id="selectExample" value={country} onChange={e=>{setSelected(10)
                            setErrors((prevItems) => prevItems.filter(item => item !== 10))
                        setCountry(e.target.value)}}>
                        <option value="" disabled  role="button" className="btn w-full bg-white border-1 border-gray-300 mt-1">{country}</option>
                        <option value="India">India</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                    {errors.includes(10) ? <Field/> : <></>}
                    </div>

                    </div>

                    </div>

                    <div>
                        <h1 className="font-bold">Country you recruit for *</h1>


                        <div>
                            <h1>Clickable Items</h1>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-5">
                                {items.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                    className="flex text-xl items-center gap-2"
                                >
                                    <input type="checkbox"  className="checkbox checkbox-sm" /> 

                                    {item}
                                </div>
                                ))}
                            </ul>
                        </div>


                    </div>
                    <div className="form-control mt-4">
                    <button onChange={()=>setCountry('uganda')} className="btn  bg-[#7367F0] text-white text-xl font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Sign Up</button>
                    </div>
                        <div className="space-y-5">
                        <p className="text-center ">Already have an account?? <Link to="/logIn" className="text-[#7367F0]  text-xl hover:underline">Sign in instead</Link></p>
                        </div>
                </form>
               
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;