// models/CollegeDetail.js

import mongoose from 'mongoose';

const CollegeDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    nirfRank: {
        type: String,
        default: 'nan'
    },
    rank: {
        type: String,
        default: 'nan'
    }
}, { collection: 'CollegeDetails' }); // Specify the collection name here

export default mongoose.model('CollegeDetails', CollegeDetailSchema);
