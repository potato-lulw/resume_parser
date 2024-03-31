const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel'); 
const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');




router.get('/jobs', async (req, res) => {
    try {
        const db = await connectDB();
        let query = {};
        if (req.query.skill) {
            query.requiredSkill = { $regex: new RegExp(req.query.skill, 'i') };
        } else if (req.query.uploadedBy) {
            query.uploadedBy = req.query.uploadedBy;
        } else if (req.query.id) {
            query._id = new ObjectId(req.query.id);
        }
        
        const jobs = await db.collection('jobs').find(query).toArray();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
});





router.post('/jobs', async (req, res) => {
    try {
        const job = new Job(req.body);
        const db = await connectDB();
        const result = db.collection('jobs').insertOne(req.body);
        
        res.status(201).json({ message: 'Job created successfully', jobId: result.insertedId });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Error creating job', error});
    }
});

module.exports = router;
