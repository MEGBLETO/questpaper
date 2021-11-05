import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = ({Doc}) => {
    console.log(Doc)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
      <div className="">
    <div className="w-1/2 flex flex-col items-center p-3 bg-gray-400">
      <Document className="justify-center p-1 w-2/3" file={Doc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page style={{ backgroundColor: 'tomato' }} pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
      </div>
  );
};

export default Viewer;
