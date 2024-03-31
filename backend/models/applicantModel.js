
const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Assuming you have a Job model and you're referencing it by its ObjectId
        required: true,
    },
    dataApplied: {
        type: Date,
        default: Date.now, // This sets the default value to the current date and time
    },
});

module.exports = mongoose.model('Applicant', ApplicantSchema);