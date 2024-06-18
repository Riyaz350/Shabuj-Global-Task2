import axios from 'axios';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PdfViewer from './PdfViewer';

const DocumentUploader = ({ setSerial, serial, setDocuments }) => {
  const [jsonString, setJsonString] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [empty, setEmpty] = useState(false)
  const [fileData, setFileData] = useState([])
  console.log(fileData)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file?.type?.startsWith('image/')) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", 'qu7exu28')
      formData.append("cloud_name", 'dija36qyv')
      axios.post(`https://api.cloudinary.com/v1_1/dija36qyv/raw/upload`, formData)
        .then(res => setFileData(prevFiles => [...prevFiles, { url: res.data.url, name: file.name, type: file.type }]))

    }  else {
      alert('Please upload an image')
    }

  };

  const handleNext = () => {
    if (fileData.length == 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
      setSerial(serial + 1)
    }
  }

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
                  <h1>{data?.name}</h1>
                  {data?.type?.startsWith('image/') ?
                    <div>
                      <img src={data?.url} alt="" />
                    </div> :
                    <div>
                      

                    </div>
                  }
                </div>
              )}
            </div>
          }
        </div>

        <h2 className={`${!empty ? 'invisible' : (fileData.length > 0 ? 'invisible' : 'visible')} text-red-500 font-bold text-center`}>Please upload your documents</h2>
        <div className="flex justify-between">
          <button onClick={() => setSerial(serial - 1)} className="btn bg-gray-400 text-lg text-white  font-bold">Back</button>
          <button onClick={handleNext} className="btn btn-primary text-lg text-white  font-bold">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;