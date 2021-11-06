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
    <div className="relative flex flex-col items-center p-3  w-full overflow-hidden border-2 bg-gray-100 ">
      <Document className="w-full justify-center p-1 " file={Doc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page  pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>

  );
};

export default Viewer;
