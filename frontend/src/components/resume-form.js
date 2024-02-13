import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfViewer from './pdf-viewer';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const ResumeForm = () => {

    const [droppedFiles, setDroppedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback(async (acceptedFiles) => {
        setDroppedFiles(acceptedFiles);
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({

        onDrop,
        multiple: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendEndpoint = "http://localhost:4000/api/upload"
        const formData = new FormData();
        formData.append("file", droppedFiles);
        setLoading(true);
        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("File upload successful");
            } else {
                console.log("Error uploading file");
            }
            // setLoading(false);
        } catch (err) {
            console.error(err);
            // setLoading(false);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <form className='flex flex-col w-[80%] justify-center' onSubmit={handleSubmit}>
            <label htmlFor="drop-box">Drop your resume</label>
            <div {...getRootProps()} className={` h-[100px] bg-secondary rounded-lg text-secondary  flex justify-center items-center cursor-pointer border-dashed border-2 border-gray-500 {isDragActive ? 'active' : ''
                    } `}>
                <input {...getInputProps()} id='drop-box'/>
                {droppedFiles.length > 0 ? (
                    <div>
                        {droppedFiles.map((file) => (
                            <div key={file.name}>{file.name}</div>
                        ))}
                        
                    </div>
                    
                ) : isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <div className='text-secondary text-center p-8'>Drop files (.pdf, .doc, .docx)</div>
                )}
            </div>
            {droppedFiles && <PdfViewer pdfFile={droppedFiles[0]} />}
            {
                loading ? (
                    <button
                        type="submit"
                        className="mt-4 inline-block bg-primary border-2 border-dark hover:bg-secondary text-secondary transition font-bold py-2 px-4 rounded"
                    >
                        Please wait...
                    </button>
                ) :
                    (
                        <button
                            type="submit"
                            className="mt-4 inline-block bg-primary border-2 border-dark hover:bg-secondary text-secondary transition font-bold py-2 px-4 rounded"
                        >
                            Upload
                        </button>
                    )
            }
            
            
            {/* Additional form fields or buttons if needed */}
        </form>

    );
};

export default ResumeForm;