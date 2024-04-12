const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'analyse');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename : function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/analyse', upload.single('file'), (req, res) => {
    // res.status(200).json({ message: 'File uploaded successfully' });
    const pythonScriptPath = path.join(__dirname, '..', 'scripts', 'analyse.py');
    const filePath = path.join(uploadDir, req.file.filename);
    const pythonProcess = spawn('python', [pythonScriptPath, filePath]);
    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data.toString()}`);
        res.status(500).json({ message: 'Error processing file', error: data.toString() });
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            res.status(500).json({ message: 'Python script exited with code', error: code });
        } else {
            // Parse the JSON string from the Python script output
            const parsedData = JSON.parse(data);
            // Send the parsed data as part of the response
            res.status(200).json({ message: 'File processed successfully', category: parsedData.category, text: parsedData.text });
        }
    });
});

module.exports = router;