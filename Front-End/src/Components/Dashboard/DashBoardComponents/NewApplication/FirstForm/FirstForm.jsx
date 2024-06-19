import  { useEffect, useState } from 'react';
import Form from './Form';

const FirstForm = ({ serial, setSerial, uniData, setFirstFormData}) => {
  const [selected, setSelected] = useState(0)
    const [errors, setErrors] = useState([])
    const [country, setCountry] = useState("")
    const [season, setSeason] = useState("")
    const [uni, setUni] = useState("")
    const [course, setCourse] = useState("")
    const [typeOfCourse, setTypeOfCourse] = useState("")
    const [applicantCountry, setApplicantCountry] = useState("")
    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']
    const typesOfCourses = ['Undergraduate', 'Postgraduate']

    
    const filter = (category) => {
        return [...new Set(uniData.map((uni) => uni?.[category]))];
      }

    const filter2 = (category, category2, category3) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] == category3 && uni?.[category2] !== 'Intake List' && uni?.[category2] !== 'Course Type').map((uni)=>uni?.[category2]))];
      }
    const filter3 = (category, category2, category3, category4, category5, category6, category7) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] === category2 && uni?.[category3] === category4 && uni?.[category5] === category6).map((uni)=>uni?.[category7]))];
      }

      const addError = (e)=>{
        setErrors(prevErrors => [...prevErrors, e]);
    }

      const handleNext =()=>{
        if(!country){
          addError(1)
        } if(!applicantCountry){
          addError(2)
        } if(!season){
          addError(3)
        } if(!typeOfCourse){
          addError(4)
        } if(!uni){
          addError(5)
        } if(!course){
          addError(6)
        }else{
          setSerial(serial+1)
        }
      }

      useEffect(()=>{
        const data = {country:country, season:season, uni:uni, course:course, typeOfCourse:typeOfCourse, applicantCountry:applicantCountry}
        setFirstFormData(data)
      },[ setFirstFormData,applicantCountry, country, course, season, typeOfCourse, uni])

    return (
        <div>
            <div className="flex flex-col p-10 bg-white shadow-lg">
                    <h1 className="text-xl">New Application</h1>
                    <div className="grid lg:grid-cols-2 gap-10">
                        <Form int={1} label='Country to Apply' state={country} setState={setCountry}  filterer={filter('Country')} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors} />
                        <Form int={2} label='Country of Student Passport' state={applicantCountry}  setState={setApplicantCountry}  dataArray={countries} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors}/>
                        <Form int={3} label='Intake' state={season}  setState={setSeason}  filterer={filter2('Country','Intake List', country)} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors}/>
                        <Form int={4} label='Course Type' state={typeOfCourse}  setState={setTypeOfCourse} dataArray={typesOfCourses} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors}/>
                        <Form int={5} label='University' state={uni} setState={setUni}  filterer={filter3('Country', country,'Course Type', typeOfCourse,'Intake List', season, 'University Name')} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors}/>
                        <Form int={6} label='Course' state={course} setState={setCourse}  filterer={filter3('University Name', uni,'Course Type', typeOfCourse,'Intake List', season, 'Course Name')} selected={selected} setSelected={setSelected} errors={errors} setErrors={setErrors}/>

                    </div>
                    <button onClick={handleNext} className="btn w-fit  lg:ml-auto btn-primary text-lg text-white  font-bold mt-5">Next</button>

                </div>
        </div>
    );
};

export default FirstForm;