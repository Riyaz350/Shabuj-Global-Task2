import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { FaCartShopping } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

const Chart = () => {
    const [stat, setStat] = useState(0)
    const serial = [
        {
            text:'New',
            logo:<FaCartShopping />
        },
        {
            text:'Approved',
            logo:<MdBarChart />
        },
        {
            text:'Declined',
            logo:<BsCurrencyDollar />
        },
    ]
    const data = useMemo(
        () => [
          [
            { name: 'Jan', uv: 4000 },
            { name: 'Feb', uv: 9000 },
            { name: 'Mar', uv: 2000 },
            { name: 'Apr', uv: 5000 },
            { name: 'May', uv: 8000 },
            { name: 'Jun', uv: 2000 },
            { name: 'Jul', uv: 1000 },
            { name: 'Aug', uv: 1400 },
            { name: 'Sep', uv: 2500 },
          ],
          [
            { name: 'Jan', uv: 4000 },
            { name: 'Feb', uv: 1000 },
            { name: 'Mar', uv: 2000 },
            { name: 'Apr', uv: 5000 },
            { name: 'May', uv: 8000 },
            { name: 'Jun', uv: 1200 },
            { name: 'Jul', uv: 5100 },
            { name: 'Aug', uv: 3300 },
            { name: 'Sep', uv: 4200 },
          ],
          [
            { name: 'Jan', uv: 4000 },
            { name: 'Feb', uv: 3000 },
            { name: 'Mar', uv: 2000 },
            { name: 'Apr', uv: 5000 },
            { name: 'May', uv: 8000 },
            { name: 'Jun', uv: 1200 },
            { name: 'Jul', uv: 5400 },
            { name: 'Aug', uv: 2300 },
            { name: 'Sep', uv: 6600 },
          ],
        ],
        []
      );
  useEffect(()=>{
    const maxUv = Math.max(...data[stat].map((entry) => entry.uv));
  const maxUvIndex = data[stat].findIndex((entry) => entry.uv === maxUv);
    setActiveIndex(maxUvIndex)
},[data, stat])
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='w-full bg-white mt-5 rounded-lg'>
        <div className='flex flex-col md:flex-row gap-5 p-10'>
            {serial.map((no, index)=>
                <button className={`md:w-1/5 lg:w-1/12 p-5 gap-2 rounded-lg flex flex-col justify-center items-center ${stat == index? 'border-2 border-purple-500': 'border-dotted border-2'}`} onClick={()=>setStat(index)} key={no}>
                    <p className={`p-2 text-2xl ${stat == index? 'bg-[#e8e6fc] text-[#7366ef] ': 'bg-[#f4f3f4] text-[#6a6673]'}`}>{no.logo}</p>
                    <p>{no.text}</p>
                </button>
            )}
        </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart  data={data[stat]} barSize={50}>
        <XAxis dataKey="name" />
        <YAxis />
          <Bar dataKey="uv" label={{ position: 'top', fill:'black' }} >
            {data[stat].map((_, index) => (
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={index === activeIndex ? '#7367f0' : '#f1f0fd'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
