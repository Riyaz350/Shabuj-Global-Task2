import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown } from "react-icons/fa";

const StudentsDetails = ({setStudentDetails}) => {
    const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [passportNo, setPassportNo] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [counsellorNo, setCounsellorNo] = useState('');
    const [studentMail, setStudentMail] = useState('');
    const [counsellorMail, setCounsellorMail] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [studentCity, setStudentCity] = useState('');
    const [studentsCountry, setStudentsCountry] = useState('')
    const [gender, setGender] = useState('Male')
    const [visaRefusal, setVisaRefusal] = useState('No')



    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']
    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"
    const radioStyle= "radio checked:bg-white border-2 checked:shadow-lg checked:border-[6px] checked:border-[#675dd1]"

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

    // const Form =({int, label})=>{
    //     return(
    //         <div  className="form-control w-full">
    //             <Label ind={int} text={label}  />
    //             <input onFocus={()=>setSelected(int)} onBlur={()=>{ setSelected(0)
    //             !counsellorMail && addError(int)}} onChange={e=>{setSelected(int)
    //                 setErrors((prevItems) => prevItems.filter(item => item !== int)) 
    //             setCounsellorMail(e.target.value)}} type="text"  placeholder="student@example.com" className={`${errors?.includes(int) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
    //             {errors.includes(int) ? <Field/> : <></>}
    //         </div>
    //     )
    // }
    useEffect(()=>{
        const data = { passportNo:passportNo, studentsCountry:studentsCountry, startDate:startDate, firstName:firstName, lastName:lastName, whatsapp:whatsapp, counsellorNo:counsellorNo, studentMail:studentMail, counsellorMail:counsellorMail, studentAddress:studentCity, gender:gender, visaRefusal:visaRefusal }
        setStudentDetails(data)
      },[setStudentDetails, counsellorMail, counsellorNo, firstName, lastName, passportNo, startDate, studentCity, studentMail, studentsCountry, whatsapp, gender, visaRefusal])

    return (
        <div className="grid lg:grid-cols-2 gap-5">

            <div className="form-control w-full ">
            <Label ind={1} text="Student Passport No."/>
            <input onFocus={()=>setSelected(1)} onBlur={()=>{ setSelected(0)
                !passportNo.trim() && addError(1)}} onChange={e=>{setSelected(1)
                    setErrors((prevItems) => prevItems.filter(item => item !== 1)) 
                setPassportNo(e.target.value)}} type="text"  placeholder="Passport No." className={`${errors?.includes(1) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
            {errors.includes(1) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={2} text='Date of birth'  />
                <DatePicker onBlur={()=>{ setSelected(0)
                !startDate && addError(2)}} className={`  z-0  gap-5 ${`${errors?.includes(2) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`} selected={startDate} onChange={(date) => {setStartDate(date)
                    setErrors((prevItems) => prevItems.filter(item => item !== 2))
                }} />
                {errors.includes(2) ? <Field/> : <></>}
            </div>

            <div className="form-control w-full ">
            <Label ind={3} text="Student First Name"/>
            <input onFocus={()=>setSelected(3)} onBlur={()=>{ setSelected(0)
                !firstName.trim() && addError(3)}} onChange={e=>{setSelected(3)
                    setErrors((prevItems) => prevItems.filter(item => item !== 3)) 
                setFirstName(e.target.value)}} type="text"  placeholder="John" className={`${errors?.includes(3) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
            {errors.includes(3) ? <Field/> : <></>}
            </div>

            
            <div  className="form-control w-full">
                <Label ind={4} text='Student Last Name'  />
                <input onFocus={()=>setSelected(4)} onBlur={()=>{ setSelected(0)
                !lastName.trim() && addError(4)}} onChange={e=>{setSelected(4)
                    setErrors((prevItems) => prevItems.filter(item => item !== 4)) 
                setLastName(e.target.value)}} type="text"  placeholder="Doe" className={`${errors?.includes(4) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />

                {errors.includes(4) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={5} text='Student Whatsapp Number'  />
                <input onFocus={()=>setSelected(5)} onBlur={()=>{ setSelected(0)
                !whatsapp.trim() && addError(5)}} onChange={e=>{setSelected(5)
                    setErrors((prevItems) => prevItems.filter(item => item !== 5)) 
                setWhatsapp(e.target.value)}} type="text"  placeholder="+0123456789" className={`${errors?.includes(5) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(5) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={6} text='Counsellor Number'  />
                <input onFocus={()=>setSelected(6)} onBlur={()=>{ setSelected(0)
                !counsellorNo.trim() && addError(6)}} onChange={e=>{setSelected(6)
                    setErrors((prevItems) => prevItems.filter(item => item !== 6)) 
                setCounsellorNo(e.target.value)}} type="text"  placeholder="+0123456789" className={`${errors?.includes(6) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(6) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={7} text='Enter Student E-Mail ID'  />
                <input onFocus={()=>setSelected(7)} onBlur={()=>{ setSelected(0)
                !studentMail.trim() && addError(7)}} onChange={e=>{setSelected(7)
                    setErrors((prevItems) => prevItems.filter(item => item !== 7)) 
                setStudentMail(e.target.value)}} type="text"  placeholder="student@example.com" className={`${errors?.includes(7) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(7) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={8} text='Email-id of Counsellor'  />
                <input onFocus={()=>setSelected(8)} onBlur={()=>{ setSelected(0)
                !counsellorMail.trim() && addError(8)}} onChange={e=>{setSelected(8)
                    setErrors((prevItems) => prevItems.filter(item => item !== 8)) 
                setCounsellorMail(e.target.value)}} type="text"  placeholder="student@example.com" className={`${errors?.includes(8) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(8) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={9} text='Student Address'  />
                <input onFocus={()=>setSelected(9)} onBlur={()=>{ setSelected(0)
                !studentAddress.trim() && addError(9)}} onChange={e=>{setSelected(9)
                    setErrors((prevItems) => prevItems.filter(item => item !== 9)) 
                setStudentAddress(e.target.value)}} type="text"  placeholder="123 Main St" className={`${errors?.includes(9) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(9) ? <Field/> : <></>}
            </div>

            <div  className="form-control w-full">
                <Label ind={10} text='Student City'  />
                <input onFocus={()=>setSelected(10)} onBlur={()=>{ setSelected(0)
                !studentCity.trim() && addError(10)}} onChange={e=>{setSelected(10)
                    setErrors((prevItems) => prevItems.filter(item => item !== 10)) 
                setStudentCity(e.target.value)}} type="text"  placeholder="City" className={`${errors?.includes(10) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(10) ? <Field/> : <></>}
            </div>

            <div  className="  w-full relative">
                <Label ind={11} text="Student Country"  />
                <div  className={`flex items-center  z-0  gap-5 ${`${errors?.includes(11) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}`}>
                    <input  value={studentsCountry} onFocus={()=>setSelected(11)}  className="w-full " 
                    onChange={()=>{setErrors((prevItems) => prevItems.filter(item => item !== 11))}} type="text"/>
                    <p onClick={()=>setSelected(11)} className="z-0  cursor-pointer justify-end flex"><FaAngleDown /></p>
                </div>
                {errors.includes(11) ? <Field/> : <></>}
                <div className={`absolute w-full bg-white shadow-lg p-2 flex flex-col text-start z-10  ${selected ==11 ?'flex' :'hidden'}`}>
                    
                    <div>
                        {selected === 11 && countries.map((country) =>  
                        <option onClick={()=>{setStudentsCountry(country)
                            setSelected(0)
                            setErrors((prevItems) => prevItems.filter(item => item !== 11))
                            }}  className="hover:bg-gray-300 rounded-lg p-1 px-2 cursor-pointer" key={country}  > {country} 
                        </option> 
                    )}
                    </div>
                    
                </div> 
            </div> 

            <div></div>

            <div>
                <div className="flex flex-col gap-5 m-5">
                <p className="text-xl">Gender</p>

                <div onClick={()=>setGender('Male')} className="flex gap-5 text-xl items-center">
                    <input className={radioStyle} type="radio" name="radio-1"   checked />
                    <p>Male</p>
                </div>
                <div onClick={()=>setGender('Female')} className="flex gap-5 text-xl items-center">
                    <input type="radio" name="radio-1" className={radioStyle} />
                    <p>Female</p>
                </div>
                </div>
            </div>

            <div>
                <div className="flex flex-col gap-5 m-5">
                    <p className="text-xl">Any Previous Visa Refusal</p>
                <div onClick={()=>setVisaRefusal('Yes')} className="flex gap-5 text-xl items-center">
                    <input className={radioStyle} type="radio" name="radio-2"    />
                    <p>Yes</p>
                </div>
                <div onClick={()=>setVisaRefusal('No')} className="flex gap-5 text-xl items-center">
                    <input type="radio" name="radio-2" className={radioStyle} checked/>
                    <p>No</p>
                </div>
                </div>
            </div>


            </div>
    );
};

export default StudentsDetails;