import  { useEffect, useState } from 'react';

const DocumentViewer = ({ base64String, type }) => {
  const [dataUrl, setDataUrl] = useState('');

  const convertBase64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  useEffect(()=>{
    const contentType = type;
    const pdfBlob = convertBase64ToBlob(base64String, contentType);
    const url = URL.createObjectURL(pdfBlob);
    setDataUrl(url);
  },[base64String, type])
  

  return (
    <div className='flex flex-col '>
      
      {dataUrl && (
        <iframe
          src={dataUrl}
          title="Data Preview"
          width="100%"
          height="400"
          style={{ border: 'none', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default DocumentViewer;
