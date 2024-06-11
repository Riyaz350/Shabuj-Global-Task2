import { useEffect, useState } from "react";
import { FaAngleDown, FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const NewApplication = () => {
    const axiosPublic = useAxiosPublic()
    const [serial, setSerial] = useState(0)
    const [uniData, setUniData] = useState([])
    const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [country, setCountry] = useState("")
    const [season, setSeason] = useState("")
    const [uni, setUni] = useState("")
    const [course, setCourse] = useState("")
    const [applicantCountry, setApplicantCountry] = useState("")
    const [typeOfCourse, setTypeOfCourse] = useState("")
    const [req, setReq]  =useState(1)
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile ] = useState(null)

    
    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']
    const courseType = ['Graduate', 'Post Graduate']
    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"
    
    
    const filter = (category) => {
        return [...new Set(uniData.map((uni) => uni?.[category]))];
      }

    const filter2 = (category, category2, category3) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] == category3).map((uni)=>uni?.[category2]))];
      }
    const filter3 = (category, category2, category3, category4, category5, category6, category7) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] === category2 && uni?.[category3] === category4 && uni?.[category5] === category6).map((uni)=>uni?.[category7]))];
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

    const addError = (e)=>{
        setErrors(prevErrors => [...prevErrors, e]);
    }

    const Form = ({int, label,  setState, inputValue, filterer, dataArray}) =>{
        return(
            <div  className="  w-full relative">
                <Label ind={int} text={label}  />
                <div onBlur={()=>setSelected(0)} className={`flex items-center  z-0  gap-5 ${`${errors?.includes(int) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}>
                    <input value={inputValue} onFocus={()=>setSelected(int)}  className="w-full" 
                    onChange={e=>{setErrors((prevItems) => prevItems.filter(item => item !== int))}} type="text"/>
                    <p onClick={()=>setSelected(int)} className="z-0  cursor-pointer justify-end flex"><FaAngleDown /></p>
                </div>
                {errors.includes(int) ? <Field/> : <></>}
                <div className={`absolute w-full bg-white shadow-lg p-2 flex flex-col text-start z-10  ${selected ==int ?'flex' :'hidden'}`}>
                    {filterer ?
                    <div>
                        {selected === int && filterer.map((country) =>  
                    <option onClick={()=>{setState(country)
                        setSelected(0)
                        setErrors((prevItems) => prevItems.filter(item => item !== int))
                        }}  className="z-10 hover:bg-gray-300 rounded-lg p-1 px-2 cursor-pointer" key={country}  > {country} </option> 
                    )}
                    </div>:
                    <div>
                        {selected === int && dataArray.map((country) =>  
                    <option onClick={()=>{setState(country)
                        setSelected(0)
                        setErrors((prevItems) => prevItems.filter(item => item !== int))
                        }}  className="hover:bg-gray-300 rounded-lg p-1 px-2 cursor-pointer" key={country}  > {country} </option> 
                    )}
                    </div>
                    }
                </div> 
            </div>
        )
    }

    useEffect(()=>{
        axiosPublic.get('/uniData')
        .then(result =>setUniData(result.data))

        
    },[axiosPublic])

    // pdf uploader
    const handleFileRead = (file) => {
        
        setFile(file);  // Set the file name state
      };
    
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        handleFileRead(file);
        
      };
    
      const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      };
    
      const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileRead(file);
        
      };
    return (
        <div  className="mt-5  rounded-lg p-5 md:grid grid-cols-4 gap-2">
            {/* UNI DATA */}
            {serial > 0 &&
                <div className="col-span-1 overflow-auto text-lg space-y-2 p-5 rounded-lg bg-white shadow-lg">
                {/* use image of uni instead of h1 */}
                <h1 className="text-center">{uni? uni : 'Null'}</h1> 
                <p><span className="font-bold">Course Name:</span>{course? course:'Null'}</p>
                <p><span className="font-bold">Intake:</span>{season? season:'Null'}</p>
                <p><span className="font-bold">Tuition Fee:</span>2100</p>
                <p><span className="font-bold">Course Duration:</span>2 Years</p>
                <p><span className="font-bold">Course Label:</span>{typeOfCourse? typeOfCourse:'Null'}</p>
                <p><span className="font-bold">Location:</span>{country? country:'Null'}</p>
                
            </div>
            }
            <div className={`bg-white shadow-lg rounded-lg  overflow-auto ${serial == 0? 'col-span-4' : 'col-span-3'}`}>
            <div>
            {serial == 0 &&
                <div className="flex flex-col p-10">
                    <h1 className="text-xl">New Application</h1>
                    <div className="grid lg:grid-cols-2 gap-10">
                        <Form int={1} label='Country to Apply' setState={setCountry} inputValue={country} filterer={filter('Country')}/>
                        <Form int={2} label='Country of Student Passport'  setState={setApplicantCountry} inputValue={applicantCountry} dataArray={countries}/>
                        <Form int={3} label='Intake'  setState={setSeason} inputValue={season} filterer={filter2('Country','Intake List', country)}/>
                        <Form int={4} label='Course Type'  setState={setTypeOfCourse} inputValue={typeOfCourse} filterer={filter2('Country','Course Type', country)}/>
                        <Form int={5} label='University'  setState={setUni} inputValue={uni} filterer={filter3('Country', country,'Course Type', typeOfCourse,'Intake List', season, 'University Name')}/>
                        <Form int={6} label='Course'  setState={setCourse} inputValue={course} filterer={filter3('University Name', uni,'Course Type', typeOfCourse,'Intake List', season, 'Course Name')}/>

                    </div>
                    <button onClick={()=>setSerial(serial+1)} className="btn w-fit  lg:ml-auto btn-primary text-lg text-white  font-bold mt-5">Next</button>

                </div>
            }
            </div>
            <div>
            {serial == 1 &&
                <div className=" ">
                    
                    <div className="  ">
                        <div className="flex text-lg gap-5 border-b-2 border-gray-200">
                            <h2 onClick={()=>setReq(1)} className={` p-2  cursor-pointer ${req ==1 ? 'text-purple-400 border-b-2 border-b-purple-400 ': ''}`}>Academic Requirement</h2>
                            <h2 onClick={()=>setReq(2)} className={` p-2  cursor-pointer ${req ==2 ? 'text-purple-400 border-b-2 border-b-purple-400  ': ''}`}>English Requirement</h2>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={()=>setSerial(serial-1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button> 
                        <button onClick={()=>setSerial(serial+1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
                    </div>

                </div>
                }
            </div>

            <div>
                {serial == 2  &&
                    <div>
                        <h1 className="text-xl font-semibold  text-gray-500 p-2">Please upload only color scan copy files</h1>
                        <div>
                        <input  type="file" name="upload" id="upload" accept=".pdf" placeholder="Drag and drop your pdf file here" onChange={handleFileUpload} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} 
                        className={`  rounded-lg w-2/3 bg-gray-100 mx-10 p-10 px-5 my-5  ${isDragging ? " border-purple-400 " : " border-black "}`}/>
                        
                        <iframe src={file} width="100%" height="500px" />
                        <div className="flex justify-between">
                            <button onClick={()=>setSerial(serial-1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button> 
                            <button onClick={()=>setSerial(serial+1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
                        </div>
                        </div>
                    </div>
                }
            </div>
            </div>

            { /* STUDENT DATA */}

            {/* <div>
            </div>

            {serial !== 0 &&
            <div   className={` flex justify-between  mt-5 ${serial == 0? 'col-span-4' : 'col-span-3'}`}>
                <div>
                    {serial !== 0 && serial !== 3 && <button onClick={()=>setSerial(serial-1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button> }
                </div>
                <div>
                {serial !== 3 ?
                    <button onClick={()=>setSerial(serial+1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>:
                    <button  className="btn btn-primary text-lg text-white  font-bold">Submit</button>
                }
                </div>
            </div>} */}

        </div>
    );
};

export default NewApplication;


// onBlur={()=>{!country && addError(1)}}