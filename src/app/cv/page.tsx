'use client'

import React, { useContext } from 'react';
import Page from '@/components/templates/Page';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
import '@/styles/pages/CV.css';
import LanguageContext from '@/context/LanguageContext';
import { FaFileDownload } from 'react-icons/fa';

// Define the context type if not already defined
interface LanguageContextType {
  isSpanish: boolean;
}

const CV = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const downloadCV = () => {
    // Using JavaScript method to get PDF file
    fetch('CV.pdf')
      .then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          const alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'Carlos Alidio Medina Lopez.pdf';
          alink.click();
        });
      })
      .catch((error) => console.error('Error downloading the file', error));
  };

  return (
    <Page>
      <p className='phrase'>
        {isSpanish
          ? 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.'
          : 'Success is not the key to happiness. Happiness is the key to success.'}
      </p>

      <p className='author'>Albert Schweitzer</p>

      <h2 className='title'>
        Curriculum Vitae{' '}
        <button onClick={downloadCV}>
          <FaFileDownload />
        </button>
      </h2>

      {/* <div className='pdf-container'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
          <Viewer theme='dark' fileUrl='CV.pdf' />
        </Worker>
      </div> */}
    </Page>
  );
};

export default CV;
