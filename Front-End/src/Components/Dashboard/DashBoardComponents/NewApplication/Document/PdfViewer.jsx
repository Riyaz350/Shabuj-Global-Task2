import  { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

const PdfViewer = ({ base64String }) => {
  const [pdfUrl, setPdfUrl] = useState('');

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
    const contentType = 'application/pdf';
    const pdfBlob = convertBase64ToBlob(base64String, contentType);
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  },[base64String])
  

  return (
    <div className='flex flex-col '>
      
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          width="600"
          height="400"
          style={{ border: 'none', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default PdfViewer;
