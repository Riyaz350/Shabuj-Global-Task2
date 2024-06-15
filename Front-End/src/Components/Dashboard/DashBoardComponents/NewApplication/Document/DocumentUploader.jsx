import axios from 'axios';
import { useEffect, useState } from 'react';

const DocumentUploader = ({setSerial, serial, setDocuments}) => {
    const [jsonString, setJsonString] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [empty, setEmpty] = useState(false)
    const [image, setImage] = useState()
    
      const handleFileUpload = (e) => {
        // const file = e.target.files[0]
        // const formData = new FormData()
        // formData.append('file', file)
        // formData.append("upload_preset", 'qu7exu28')
        // formData.append("cloud_name",'dija36qyv' )
        // axios.post(`https://api.cloudinary.com/v1_1/dija36qyv/raw/upload`, formData)
        // .then(res=>console.log(res.data.url, file.name, file.type))
        // .catch(err=>console.log(err))
           
      };

      // const handleNext=()=>{
      //   if(jsonString.length == 0){
      //     setEmpty(true)
      //   }else{
      //     setSerial(serial+1)
      //   }
      // }

      
    
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
        setIsDragging(true);

      };
    
      const handleDrop = () => {
        
      };

      // useEffect(()=>{
      //   setDocuments(jsonString)
      // },[jsonString, setDocuments])
    return (
        <div>
          <h1 className="text-xl font-semibold  text-gray-500 p-2">Please upload only color scan copy files</h1>
          <div>
          <input  type="file" name="upload" id="upload"  placeholder="Drag and drop your pdf file here" onChange={handleFileUpload} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} 
          className={`  rounded-lg w-2/3 bg-gray-100 mx-10 p-10 px-5 my-5  ${isDragging ? " border-purple-400 " : " border-black "}`}/>
          
          {/* <h2 className={`${!empty? 'invisible' : (jsonString.length > 0 ? 'invisible' : 'visible')} text-red-500 font-bold text-center`}>Please upload your documents</h2> */}
          <div className="flex justify-between">
              <button onClick={()=>setSerial(serial-1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button> 
              <button onClick={()=>setSerial(serial+1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
          </div>
          </div>
        </div>
    );
};

export default DocumentUploader;