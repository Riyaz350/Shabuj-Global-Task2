import React, { useState } from 'react';
import { saveAs } from 'file-saver';
const DocumentDownloader = ({  applicationData }) => {
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

  const handlePreview = () => {
    const contentType = applicationData?.type;
    const pdfBlob = convertBase64ToBlob(applicationData?.string, contentType);
    const url = URL.createObjectURL(pdfBlob);
    setDataUrl(url);
  };

  const handleDownload = () => {
    const contentType = 'application/pdf';
    const pdfBlob = convertBase64ToBlob(applicationData?.string, contentType);
    saveAs(pdfBlob, applicationData?.name);
  };

  return (
    <div className='flex flex-col'>
      <button onClick={handlePreview}>Preview</button>
      <button onClick={handleDownload}>Download</button>
      {dataUrl && (
        <iframe
          src={dataUrl}
          title="Preview"
          width="600"
          height="400"
          style={{ border: 'none', marginTop: '20px' }}
        />
      )}
    </div>
  );

};

export default DocumentDownloader;