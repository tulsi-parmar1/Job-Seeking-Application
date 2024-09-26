import mongoose from "mongoose";
import validator from "validator";
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobModel',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel', // Assuming you have a User model
        required: true
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    coverLetter: {
        type: String
    },
    // status: {
    //     type: String,
    //     default: 'Pending', // e.g., Pending, Reviewed, Interviewed, Offered, Rejected
    //     enum: ['Pending', 'Reviewed', 'Interviewed', 'Offered', 'Rejected']
    // },
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    contactNumber:{
        type:Number,
        require:true,
    },
    currentCity:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:[true,'please enter your email!'],
        validate:[validator.isEmail,'please enter valid Email!'],
    },
});

const ApplicationModel = mongoose.model('Application', applicationSchema);

export default ApplicationModel;