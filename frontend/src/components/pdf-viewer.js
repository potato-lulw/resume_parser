import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function PdfViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [height, setHeight] = useState(400);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className={`p-[25px] bg-secondary my-[25px] w-fit overflow-auto max-h-[400px] relative self-center rounded-lg ${numPages === 0? "hidden": "block"}`} >
            <div className='flex justify-between'>

            <h1 className='text-lg mb-2' >Preview</h1>
            <div className='flex gap-2 text-lg hover:cursor-pointer'>
                    <button onClick={(e) => { e.preventDefault(); setHeight(height - 50) }}>-</button>
                    <button onClick={(e) => { e.preventDefault(); setHeight(height + 50) }}>+</button>
                    <button onClick={(e) => { e.preventDefault(); setHeight(500) }}>Reset</button>
                </div>
            </div>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} >
                {Array.apply(null, Array(numPages))
                    .map((x, i) => {
                        return i+1;
                    })
                    .map((page) => <Page key={page} className="mb-2" pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} canvasBackground='#000' height={height}/>)}
            </Document>
        </div>
    );
}

export default PdfViewer