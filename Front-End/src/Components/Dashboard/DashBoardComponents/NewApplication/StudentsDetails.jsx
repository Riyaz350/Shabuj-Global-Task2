import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentsDetails = ({Form}) => {
    const [passportNo, setPassportNo] = useState('')
    const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [studentsCountry, setStudentsCountry] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [firstName, setFirstName] = useState(null);


    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']
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
    
    return (
        <div className="grid lg:grid-cols-2 gap-5">

            <div className="form-control w-full ">
            <Label ind={"1"} text="Student Passport No."/>
            <input onFocus={()=>setSelected(1)} onBlur={()=>{ setSelected(0)
                !passportNo && addError(1)}} onChange={e=>{setSelected(1)
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

            <div  className="form-control w-full">
                <Label ind={3} text='Student First Name'  />
                <input onFocus={()=>setSelected(3)} onBlur={()=>{ setSelected(0)
                !firstName && addError(3)}} onChange={e=>{setSelected(3)
                    setErrors((prevItems) => prevItems.filter(item => item !== 3)) 
                setFirstName(e.target.value)}} type="text"  placeholder="First Name" className={`${errors?.includes(3) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />

                {errors.includes(3) ? <Field/> : <></>}
            </div>
            
            <div  className="form-control w-full">
                <Label ind={4} text='Student Last Name'  />
                <input onFocus={()=>setSelected(4)} onBlur={()=>{ setSelected(0)
                !firstName && addError(4)}} onChange={e=>{setSelected(4)
                    setErrors((prevItems) => prevItems.filter(item => item !== 4)) 
                setFirstName(e.target.value)}} type="text"  placeholder="Last Name" className={`${errors?.includes(4) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />

                {errors.includes(4) ? <Field/> : <></>}
            </div>

            {/* <Form2 label='Student First Name'/>
            <Form2 label='Student Last Name'/>
            <Form2 label='Student WhatsApp Number'/>
            <Form2 label='Counsellor Number'/>
            <Form2 label='Enter Student E-Mail ID'/>
            <Form2 label='Email-id of Counsellor'/>
            <Form2 label='Student Address'/>
            <Form2 label='Student City'/> */}
            <Form int={11} label='Country of Student Passport'  setState={setStudentsCountry} inputValue={studentsCountry} dataArray={countries}/>
            </div>
    );
};

export default StudentsDetails;