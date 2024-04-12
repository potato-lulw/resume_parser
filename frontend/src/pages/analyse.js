import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfViewer from '../components/pdf-viewer';
import { pdfjs } from 'react-pdf';
import WordCloud from '../components/word-cloud';
import Papa from 'papaparse';
import BarChart from '../components/bar-chart';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Analyze = () => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [resumeType, setResumeType] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  
  
  const [wordFrequencies, setWordFrequencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/top_30_words_per_category.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const { data } = Papa.parse(csv, { header: true });

        const selectedJobTitle = resumeType; // Assuming 'Data Science' for testing
        const selectedData = data.filter(row => row.Category === selectedJobTitle);

        if (selectedData.length > 0) {
          const wordFrequencies = selectedData.map(row => ({
            word: row.Word,
            frequency: parseInt(row.Frequency)
          }));
          setJobTitle(selectedJobTitle);
          setWordFrequencies(wordFrequencies);
        }
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, [resumeType]);

  

  const onDrop = useCallback(async (acceptedFiles) => {
    setDroppedFiles(acceptedFiles);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/analyse', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResumeType(data.category);
      setResumeText(data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div className='flex justify-center mt-8'>
      <form className='w-[80%]'>
        <label htmlFor="drop-box" className='text-3xl font-bold my-2 text-secondary'>Drop your resume!</label>
        <div {...getRootProps()} className={` h-[100px] bg-secondary rounded-lg text-secondary  flex justify-center items-center cursor-pointer border-dashed border-2 border-gray-500 {isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} id='drop-box' />
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
        <div className='flex items-center justify-center gap-8'>
          {droppedFiles && <PdfViewer pdfFile={droppedFiles[0]} />}
          <div>
            {resumeText && !isLoading && (
              <h1 className='font-medium text-2xl text-secondary'>Your Resume says that you are a <span className='text-primary font-bold text-3xl'>{resumeType}</span></h1>
              
            )}
            {jobTitle && <BarChart jobTitle={jobTitle} wordFrequencies={wordFrequencies} />}
            
          
        
          </div>
        </div>
        {resumeText && <WordCloud text={resumeText} />}
        
      </form>
    </div>
  );
}

export default Analyze;
