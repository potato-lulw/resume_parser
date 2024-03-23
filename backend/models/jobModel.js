const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    requiredSkill: {
        type: [String],
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: String, 
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now // Sets default value to current date/time
    },
    endDate: {
        type: Date,
        required: true // Change as per your requirement
    }
});

module.exports = mongoose.model('Job', JobSchema);
