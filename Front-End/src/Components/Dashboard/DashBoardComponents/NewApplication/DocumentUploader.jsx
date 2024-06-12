import React, { useState } from 'react';

const DocumentUploader = ({setSerial, serial, setDocuments}) => {
    const [jsonString, setJsonString] = useState([]);
    const [isDragging, setIsDragging] = useState(false);


    const handleFileRead = (e) => {
        const file = e.target.files[0];
      };
    
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            const jsonObject = { fileName: file.name, fileData: base64String, fileType: file.type };
            const jsonStr = JSON.stringify(jsonObject);
            setJsonString(oldArray => [...oldArray,jsonStr] )
            setDocuments(jsonString)
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select a valid file');
        }
      };

      const renderFile = () => {
        const jsonArray = jsonString.map((json)=>JSON.parse(json));
        const fileUrl = jsonArray.map((json)=>`data:${json.fileType};base64,${json.fileData}`);
        console.log(fileUrl)
        
        return(
            <div>
                {jsonArray.map((jsonObject, index) => (
                <div key={index}>
                  <h3>{jsonObject.fileName}</h3>
                  {jsonObject.fileType.startsWith('image/') ? (
                    <img src={`data:${jsonObject.fileType};base64,${jsonObject.fileData}`} alt={jsonObject.fileName} style={{ maxWidth: '100%', height: 'auto' }} />
                  ) : jsonObject.fileType === 'application/pdf' ? (
                    <></>
                    // <iframe
                    //   src={`data:application/pdf;base64,${jsonObject.fileData}`}
                    //   title={jsonObject.fileName}
                    //   style={{ width: '100%', height: '500px' }}
                    // />
                  ) : null}
                </div>
              ))}
            </div>
        )
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
        handleFileRead(file);
        
      };
    return (
        <div>
                        <h1 className="text-xl font-semibold  text-gray-500 p-2">Please upload only color scan copy files</h1>
                        <div>
                        <input  type="file" name="upload" id="upload"  placeholder="Drag and drop your pdf file here" onChange={handleFileUpload} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} 
                        className={`  rounded-lg w-2/3 bg-gray-100 mx-10 p-10 px-5 my-5  ${isDragging ? " border-purple-400 " : " border-black "}`}/>
                        
                        {jsonString.length>0 && (
                        <div>
                            {renderFile()}
                        </div>)}
                        <div className="flex justify-between">
                            <button onClick={()=>setSerial(serial-1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button> 
                            <button onClick={()=>setSerial(serial+1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
                        </div>
                        </div>
                    </div>
    );
};

export default DocumentUploader;