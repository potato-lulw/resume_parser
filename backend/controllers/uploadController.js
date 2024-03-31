const connectDB = require('../config/db'); // Adjust the path as necessary
const File = require('../models/fileModel'); // Adjust the path as necessary
const pythonScriptController = require('./pythonController'); // Adjust the path as necessary

const Applicant = require('../models/applicantModel'); 
const { application } = require('express');


const uploadFile = async (req, res) => {
    try {
        // Establish the database connection
        const db = await connectDB();
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Call the Python script to process the file
        const extractedData = await pythonScriptController.callPythonScript(req.file.path);

        // Create a new File model instance with the uploaded file's information
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
        });

        // Save the file information to the database
        try{
            const result = await db.collection('files').insertOne(file);
        }
        catch(e) {
            return console.error(e);
        }
      
        res.status(200).json({
            message: 'File processed and stored successfully!',
            fileId: file._id,
            extractedData: extractedData, 
        });
    } catch (error) {
        console.error("Error in uploadFile:", error);
        res.status(500).json({ message: 'Error processing file', error: error.message });
    }
};

const submitApplication = async (req, res) => {

    try {
        const db = await connectDB();
        console.log(req.body);
        const applicant = new Applicant({
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            skills: req.body.skills,
            experience: req.body.experience,
            fileName: req.body.fileName,
            jobID: req.body.jobID,
        });
        console.log(applicant.skills);

        // Save the applicant data to the database
        const result = await db.collection('applicants').insertOne(applicant); 
        
        res.status(201).json({ message: 'Application submitted successfully', applicant: result });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
};




module.exports = {
    uploadFile, submitApplication
};