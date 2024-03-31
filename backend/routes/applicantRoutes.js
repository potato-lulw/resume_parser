

// applicantRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');

// Route to create a new applicant
router.post('/applicants', uploadController.submitApplication);

// Route to get applicant information by ID
router.get('/applicants/:jobID', async (req, res) => {
    try {
        const db = await connectDB(); // Assuming connectDB is a function that returns a database connection
        const applicants = await db.collection("applicants").find({ jobID: new ObjectId(req.params.jobID) }).toArray();
    
        // console.log(applicants);
        res.status(200).json(applicants);
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ message: 'Error fetching applicants', error });
    }
});




module.exports = router;