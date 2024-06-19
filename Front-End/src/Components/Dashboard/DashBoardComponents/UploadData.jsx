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
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
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

  const processSPData = (spreadSheetJson) => {
    const processedSpreadSheetData = [];
    let savedUniversityName = 'n/a';
    for (let i = 0; i < spreadSheetJson.length; i += 1) {
      !spreadSheetJson[i][1] ? spreadSheetJson[i][1] = savedUniversityName : savedUniversityName = spreadSheetJson[i][1];
      processedSpreadSheetData.push(spreadSheetJson[i])
    }

    return processedSpreadSheetData;
    
  };

  const uploadUniData = () => {
    if (data.length > 0) {
      const processedJsonData = processSPData(data);
      const batchSize = 100;
      const length = processedJsonData.length;
      console.log(length)
      for (let i = 0; i < length; i += Math.min(batchSize, length - i)) {
        axiosPublic.post('/uniData' ,processedJsonData.slice(i, i + Math.min(batchSize, length - i)))
        .then(data =>console.log(data))
        .catch(err =>console.log(err))
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

      {data.length > 0 &&
        <div className="border-2 border-black mt-10 rounded-lg p-5">
          {fileName && <p>File selected: {fileName}</p>}
          <button onClick={uploadUniData} className="px-4 py-2 rounded-lg mt-2 bg-[#7367f0]  text-white font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Upload</button>
        </div>
      }

    </div>
  );
};

export default UploadData;
