const connectDB = require('../config/db'); // Adjust the path as necessary
const File = require('../models/fileModel'); // Adjust the path as necessary
const pythonScriptController = require('./pythonController'); // Adjust the path as necessary

const uploadFile = async (req, res) => {
    try {
        // Establish the database connection
        const db = await connectDB();
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Call the Python script to process the file
        await pythonScriptController.callPythonScript(req.file.path);

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
      
        res.status(200).json({ message: 'File processed and stored successfully!', fileId: file._id });
    } catch (error) {
        console.error("Error in uploadFile:", error);
        res.status(500).json({ message: 'Error processing file', error: error.message });
    }
};

module.exports = {
    uploadFile,
};