import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form2 from "./Form2";
import Form from "../FirstForm/Form";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import {extractDateTime} from '../../../../../Tools/timeExtractor.js'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import  { AuthContext } from "../../../../Provider/AuthProvider.jsx";

const StudentsDetails = ({   documents, firstFormData }) => {
    const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [passportNo, setPassportNo] = useState('')
    const [birthDate, setBirthDate] = useState(null);
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
    const [studentDetails, setStudentDetails] = useState({})

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const currentTime = extractDateTime()

    const {user} = useContext(AuthContext)


    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']
    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"
    const radioStyle = "radio  border-2 "
    const activeRadioStyle ="radio bg-white  border-[6px]  shadow-lg  border-[#675dd1]"
    const radioStyle2= "flex gap-5 text-xl items-center"


    const Field = () => {
        return (<div className="label">
            <span className="label-text text-red-500">This field is required</span>
        </div>)
    }

    const Label = ({ text, ind }) => {
        return (<div className="label">
            <span className={errors.includes(parseInt(ind)) ? "label-text text-red-500" : selected == parseInt(ind) ? "label-text text-purple-500" : "label-text text-black-500"}>{text}</span>
        </div>)
    }
    const addError = (e) => {
        setErrors(prevErrors => [...prevErrors, e]);
    }

    const handleSubmit=()=>{
        if(!passportNo){
            addError(1)
          } if(!birthDate){
            addError(2)
          } if(!firstName){
            addError(3)
          } if(!lastName){
            addError(4)
          } if(!whatsapp){
            addError(5)
          } if(!counsellorNo){
            addError(6)
          }if(!studentMail){
            addError(7)
          }if(!counsellorMail){
            addError(8)
          }if(!studentAddress){
            addError(9)
          }if(!studentCity){
            addError(10)
          }if(!studentsCountry){
            addError(11)
          }else{
            const data = {cpMail:user?.email, documents:documents, universityData:firstFormData, studentDetails:studentDetails, time:currentTime, status:{time:currentTime, status:'Pending'}, comments:[]}
            axiosPublic.post('/applications' , data)
            .then((data)=> {
              if(data.status == 200){
                Swal.fire({ position: "top-end", icon: "success", title: "Application successful", showConfirmButton: false, timer: 1500 })
                navigate('/applicationHistory')
  
                navigate('/applicationHistory')
              }
            })}
    }

    useEffect(() => {
        const data = { passportNo: passportNo, studentsCountry: studentsCountry, birthDate: birthDate, firstName: firstName, lastName: lastName, whatsapp: whatsapp, counsellorNo: counsellorNo, studentMail: studentMail, counsellorMail: counsellorMail, studentAddress: studentAddress, studentCity: studentCity, gender: gender, visaRefusal: visaRefusal }
        setStudentDetails(data)
    }, [setStudentDetails, counsellorMail, counsellorNo, firstName, lastName, passportNo, birthDate, studentCity, studentMail, studentsCountry, whatsapp, gender, visaRefusal, studentAddress])

    return (
        <div className="flex flex-col">
            <div className="grid lg:grid-cols-2 gap-5 ">


                <Form2 int={1} label='Student Passport No.' state={passportNo} setState={setPassportNo} placeholder='Passport No.' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />

                <div className="form-control w-full">
                    <Label ind={2} text='Date of birth' />
                    <DatePicker onBlur={() => {
                        setSelected(0)
                        !birthDate && addError(2)
                    }} className={`  z-0  gap-5 ${`${errors?.includes(2) ? 'border-2 border-red-500 focus:border-red-500' : 'border-gray-400'} ${inputStyle}`}`} selected={birthDate} onChange={(date) => {
                        setBirthDate(date)
                        setErrors((prevItems) => prevItems.filter(item => item !== 2))
                    }} />
                    {errors.includes(2) ? <Field /> : <></>}
                </div>


                <Form2 int={3} label='Student First Name' state={firstName} setState={setFirstName} placeholder='John' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={4} label='Student Last Name' state={lastName} setState={setLastName} placeholder='Doe' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={5} label='Student Whatsapp Number' state={whatsapp} setState={setWhatsapp} placeholder='+0123456789' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={6} label='Counsellor Number' state={counsellorNo} setState={setCounsellorNo} placeholder='+0123456789' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={7} label='Enter Student E-Mail ID' state={studentMail} setState={setStudentMail} placeholder='student@example.com' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={8} label='Email-id of Counsellor' state={counsellorMail} setState={setCounsellorMail} placeholder='student@example.com' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={9} label='Student Address' state={studentAddress} setState={setStudentAddress} placeholder='123 Main St' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form2 int={10} label='Student City' state={studentCity} setState={setStudentCity} placeholder='City' selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                <Form int={11} label='Country of Student Passport' state={studentsCountry} setState={setStudentsCountry} dataArray={countries} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />


                <div></div>

                <div>
                    <div className="flex flex-col gap-5 m-5">
                        <p className="text-xl">Gender</p>

                        <div  className={radioStyle2}>
                            <input onChange={() => setGender('Male')}   className={`${gender == 'Male' ? activeRadioStyle : radioStyle}`} type="radio" name="radio-1"   />
                            <p>Male</p>
                        </div>
                        <div    className={radioStyle2}>
                            <input onChange={() => setGender('Female')} className={`${gender == 'Female' ? activeRadioStyle : radioStyle}`} type="radio" name="radio-1"    />
                            <p>Female</p>
                        </div>

                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-5 m-5">
                        <p className="text-xl">Any Previous Visa Refusal</p>

                        <div  className={radioStyle2}>
                            <input  onChange={() => setVisaRefusal('Yes')} className={`${visaRefusal == 'Yes' ? activeRadioStyle : radioStyle}`} type="radio" name="radio-2" />
                            <p>Yes</p>
                        </div>
                        <div    className={radioStyle2}>
                            <input    onChange={() => setVisaRefusal('No')} className={`${visaRefusal == 'No' ? activeRadioStyle : radioStyle}`} type="radio" name="radio-2"    />
                            <p>No</p>
                        </div>

                    </div>
                </div>

                <button onClick={handleSubmit} className="btn m-10 ml-auto btn-primary text-lg text-white  font-bold">Submit</button>

            </div>
        </div>
    );
};

export default StudentsDetails;