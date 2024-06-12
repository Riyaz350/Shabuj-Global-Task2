import React, { useEffect, useState } from 'react';

const FirstForm = ({Form, serial, setSerial, uniData, setFirstFormData}) => {
    const [country, setCountry] = useState("")
    const [season, setSeason] = useState("")
    const [uni, setUni] = useState("")
    const [course, setCourse] = useState("")
    const [typeOfCourse, setTypeOfCourse] = useState("")
    const [applicantCountry, setApplicantCountry] = useState("")
    const countries = ['Bangladesh', 'India', 'Nigeria', 'Bhutan', 'Ghana', 'Sri Lanka']

    const filter = (category) => {
        return [...new Set(uniData.map((uni) => uni?.[category]))];
      }

    const filter2 = (category, category2, category3) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] == category3).map((uni)=>uni?.[category2]))];
      }
    const filter3 = (category, category2, category3, category4, category5, category6, category7) => {
        return [... new Set(uniData.filter((uni) => uni?.[category] === category2 && uni?.[category3] === category4 && uni?.[category5] === category6).map((uni)=>uni?.[category7]))];
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
                        <Form int={1} label='Country to Apply' setState={setCountry} inputValue={country} filterer={filter('Country')}/>
                        <Form int={2} label='Country of Student Passport'  setState={setApplicantCountry} inputValue={applicantCountry} dataArray={countries}/>
                        <Form int={3} label='Intake'  setState={setSeason} inputValue={season} filterer={filter2('Country','Intake List', country)}/>
                        <Form int={4} label='Course Type'  setState={setTypeOfCourse} inputValue={typeOfCourse} filterer={filter2('Country','Course Type', country)}/>
                        <Form int={5} label='University'  setState={setUni} inputValue={uni} filterer={filter3('Country', country,'Course Type', typeOfCourse,'Intake List', season, 'University Name')}/>
                        <Form int={6} label='Course'  setState={setCourse} inputValue={course} filterer={filter3('University Name', uni,'Course Type', typeOfCourse,'Intake List', season, 'Course Name')}/>

                    </div>
                    <button onClick={()=>setSerial(serial+1)} className="btn w-fit  lg:ml-auto btn-primary text-lg text-white  font-bold mt-5">Next</button>

                </div>
        </div>
    );
};

export default FirstForm;