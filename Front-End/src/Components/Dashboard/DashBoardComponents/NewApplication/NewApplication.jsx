import { useEffect, useState } from "react";
import { FaAngleDown, FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import DocumentUploader from "./DocumentUploader";
import FirstForm from "./FirstForm";
import Requirements from "./Requirements";
import UniData from "./UniData";
import StudentsDetails from "./StudentsDetails";

const NewApplication = () => {
    const axiosPublic = useAxiosPublic()
    const [serial, setSerial] = useState(0)
    const [uniData, setUniData] = useState([])
    const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [documents, setDocuments] = useState([])
    const [firstFormData, setFirstFormData] = useState({})
    const [studentDetails, setStudentDetails] = useState({})
    const country = firstFormData.country
    const season = firstFormData.season
    const uni = firstFormData.uni
    const course = firstFormData.course
    const typeOfCourse = firstFormData.typeOfCourse


    
    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"
    
    
   
    
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

    
    return (
        <div  className="mt-5  rounded-lg p-5 md:grid grid-cols-4 gap-2">
            {/* UNI DATA */}
            {serial > 0 &&
                <UniData uni={firstFormData?.uni} season={firstFormData?.season} course={firstFormData?.course} typeOfCourse={firstFormData?.typeOfCourse} country={firstFormData?.country}/>
            }
            <div className={`    rounded-lg  overflow-auto ${serial == 0? 'col-span-4' : 'col-span-3'}`}>
            <div>
            {serial == 0 &&
                <FirstForm Form={Form} serial={serial} setSerial={setSerial} uniData={uniData} setFirstFormData={setFirstFormData}/>
            }
            </div>
            <div>
            {serial == 1 &&
                <Requirements serial={serial} setSerial={setSerial}/>
                }
            </div>

            <div>
                {serial == 2  &&
                    <DocumentUploader serial={serial} setSerial={setSerial} setDocuments={setDocuments} />
                }
            </div>
            <div>
                {serial == 3  &&
                <div className="flex flex-col bg-white  rounded-lg">
                    <h1 className="p-5 text-lg md:text-xl font-semibold">Please enter student details to process this application            </h1>
                    <div className="m-5 ">
                        <StudentsDetails setStudentDetails={setStudentDetails}/>
                    </div>
                        <button  className="btn m-10 ml-auto btn-primary text-lg text-white  font-bold">Submit</button>
                </div>
                }
            </div>
            </div>

        </div>
    );
};

export default NewApplication;


// onBlur={()=>{!country && addError(1)}}