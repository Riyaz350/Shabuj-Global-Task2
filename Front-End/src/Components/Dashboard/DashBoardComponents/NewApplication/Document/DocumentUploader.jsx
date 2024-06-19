import { useEffect, useState } from 'react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import DocumentViewer from './DocumentViewer';

const DocumentUploader = ({ setSerial, serial, setDocuments }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileData, setFileData] = useState([])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file?.type?.startsWith('image/') || file?.type?.startsWith('application/pdf')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; 
        setFileData(prevFiles => [...prevFiles, { string: base64String, name: file.name, type: file.type }]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a pdf or image')
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
    setIsDragging(true);

  };

  useEffect(() => {
    setDocuments(fileData)
  }, [fileData, setDocuments])
  return (
    <div>
      <h1 className="text-xl font-semibold  text-gray-500 p-2">Please upload only color scan copy files</h1>
      <div>
        <input type="file" name="upload" id="upload" placeholder="Drag and drop your pdf file here" onChange={handleFileUpload} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleFileUpload}
          className={`  rounded-lg w-2/3 bg-gray-100 mx-10 p-10 px-5 my-5  ${isDragging ? " border-purple-400 " : " border-black "}`} />

        <div className='overflow-scroll   '>
          {fileData &&
            <div className='flex flex-col gap-2'>
              {fileData.map((data, index) =>
                <div className='shadow-lg rounded-lg text-xl p-5 bg-white' key={index}>
                  
                    <div>
                      <h1>{data?.name}</h1>
                      <DocumentViewer base64String={data?.string} type={data?.type}/>
                    </div>
                  
                </div>
              )}
            </div>
          }
        </div>

        <div className="flex justify-between">
          <button onClick={() => setSerial(serial - 1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button>
          <button onClick={() => setSerial(serial + 1)} className="btn btn-primary text-lg text-white  font-bold">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;
