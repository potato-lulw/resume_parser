const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the upload directory path
const uploadDir = path.join(__dirname, '..', 'uploads');

// Check if the upload directory exists, create it if not
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the defined upload directory
 },
 filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
 },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadController.uploadFile);


module.exports = router;