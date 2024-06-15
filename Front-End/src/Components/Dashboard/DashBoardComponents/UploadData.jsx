import { useState } from "react";
import * as XLSX from "xlsx";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UploadData = () => {
  const [data, setData] = useState([]);
   const [fileName, setFileName] = useState(""); 
  const [isDragging, setIsDragging] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
      setFileName(file.name); 
    };
    reader.readAsBinaryString(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      handleFileRead(file);
    } else {
      alert("Please upload a valid .xlsx file");
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      handleFileRead(file);
    } else {
      alert("Please drop a valid .xlsx file");
    }
  };

  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const uploadUniData = () => {
    if (data.length > 0) {
      const batchSize = 100
      const batches = chunkArray(data, batchSize);
      console.log(batches)
      for (const batch of batches) {

        axiosPublic.post('/uniData', batch);
      }
    }
  };

  return (
    <div>
      

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={` rounded-lg border-dashed border-2 p-10 px-5 my-5  ${isDragging ? " border-purple-400 " : " border-black "}`}
      >
        Drag and drop your .xlsx file here
      </div>

      <form>
        <label className="mx-5" htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          accept=".xlsx"
          onChange={handleFileUpload}
        />
      </form>

      {data.length>0 &&
      <div className="border-2 border-black mt-10 rounded-lg p-5">
      {fileName && <p>File selected: {fileName}</p>}
      <button onClick={uploadUniData} className="px-4 py-2 rounded-lg mt-2 bg-[#7367f0]  text-white font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Upload</button>
      </div>
      }

    </div>
  );
};

export default UploadData;
