import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const AdminDashBoard = () => {
    const [mid, setMid] = useState(false)
    useEffect(()=>{
        if(window.innerWidth < 1280){
            setMid(true)
        }else{
            return
        }
    },[setMid])


    const Card = ({title})=>{
        return(
            <div className="p-5 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-xl font-thin text-gray-400">Last Week</p>
                <div className="font-bold flex justify-between items-center mt-5">
                    <p className="text-3xl">12</p>
                    <p className="text-green-400 ">+12.6%</p>
                </div>
            </div>
                    )}
    return (
        <div>
            <div className={`${mid? "grid-cols-2": "grid-cols-4"} grid gap-5 mt-5`}>
                        <Card title="New Application"/>
                        <Card title="Application Review"/>
                        <Card title="Application Submitted"/>
                        <Card title="Application Declined"/>
                        
                    </div>

                    <Chart/>
        </div>
    );
};

export default AdminDashBoard;