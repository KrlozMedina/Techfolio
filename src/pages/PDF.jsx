import React, { useState } from 'react'
import Pages from '../components/templates/Page'

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import '../styles/pages/PDF.css'

import { Document, Page } from 'react-pdf';
import pdfFile from '../CV.pdf';

const PDF = () => {
  const [filePDF, setFilePDF] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);
  const fileType = ['application/pdf']

  const handlerChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setFilePDF(e.target.result)
        }
      } else {
        setFilePDF(null)
      }
    } else {
      console.log("Please selected a PDF")
    }
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (filePDF !== null) {
      setViewPDF(filePDF)
    } else {
      setViewPDF(null)
    }
    console.log("submit success")
  }

  const newPlugin = defaultLayoutPlugin();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentSuccess({numPages}) {
    setNumPages(numPages)
  }

  return (
    <Pages>
      <form onSubmit={handlerSubmit}>
        <input type="file" onChange={handlerChange} />
        <button type='submit' >View PDF</button>
      </form>

      <h2>Vew PDF</h2>
      <div className='pdf-container'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js' >
          {
            viewPDF && <><Viewer theme="dark" fileUrl={viewPDF} plugins={[newPlugin]} /></>
          }
          {
            !viewPDF && <>Sin PDF</>
          }
        </Worker>
      </div>

      <div className="diplomaImagen">
          <Document file={pdfFile} onLoadSuccess={onDocumentSuccess} >
            <Page width={window.screen.width * 0.4} pageNumber={pageNumber} ></Page>
          </Document>
      </div>
    </Pages>
  )
}

export default PDF
