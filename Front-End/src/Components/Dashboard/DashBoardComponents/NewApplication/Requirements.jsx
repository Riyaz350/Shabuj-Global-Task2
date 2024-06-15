import React, { useState } from 'react';

const Requirements = ({ serial, setSerial }) => {
    const [req, setReq] = useState(1)

    return (
        <div className=" ">

            <div className=" bg-white">
                <div className="flex text-lg gap-5 border-b-2 border-gray-200">
                    <h2 onClick={() => setReq(1)} className={` p-2  cursor-pointer ${req == 1 ? 'text-purple-400 border-b-2 border-b-purple-400 ' : ''}`}>Academic Requirement</h2>
                    <h2 onClick={() => setReq(2)} className={` p-2  cursor-pointer ${req == 2 ? 'text-purple-400 border-b-2 border-b-purple-400  ' : ''}`}>English Requirement</h2>
                </div>
                <div className="p-5">
                    {
                        req === 1 ?
                            <p>Applicants to the MSc in Artificial Intelligence program are expected to hold a first or upper-second class bachelors degree in Computer Science, Mathematics, Statistics, or a closely related field. Relevant professional experience in data analysis, machine learning, or software development can compensate for degree subjects that are less directly related. Candidates with a background in physics or engineering, who demonstrate substantial quantitative skills, may also be considered.</p> :
                            <p>Non-native English speakers must demonstrate English proficiency through one of the following qualifications: IELTS with an overall band score of at least 6.5, with no component less than 6.0; TOEFL iBT with a minimum total score of 90, with at least 20 in reading, listening, and writing; or equivalent scores in other recognized tests like PTE Academic or CAE.</p>
                    }
                </div>
            </div>
            <div className="flex justify-between p-5">
                <button onClick={() => setSerial(serial - 1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button>
                <button onClick={() => setSerial(serial + 1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
            </div>

        </div>
    );
};

export default Requirements;