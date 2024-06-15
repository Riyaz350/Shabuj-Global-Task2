import React from 'react';

const SelectedApplicationTable = ({ prop1, prop2, prop3, prop4 }) => {
    const pStyle = "p-2 border-b-[1px] border-gray-200 py-3 w-full"
    return (
        <div className="grid grid-cols-4  text-lg w-full">
            <p className={`font-semibold ${pStyle}`}>{prop1}</p>
            <p className={pStyle}>{prop2}</p>
            <p className={`font-semibold ${pStyle}`}>{prop3}</p>
            <p className={pStyle}>{prop4}</p>
        </div>
    );
};

export default SelectedApplicationTable;