import React from 'react';

const UniData = ({uni, course, season, typeOfCourse, country}) => {
    return (
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
    );
};

export default UniData;