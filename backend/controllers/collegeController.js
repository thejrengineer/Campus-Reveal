// controllers/collegeController.js

import CollegeDetail from '../models/College.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables





// controllers/requestCollegeController.js
import nodemailer from 'nodemailer';

// Assuming you have set up your email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Your sender email
        pass: process.env.PASSWORD // Your email password or app password
    },
    tls: {
        rejectUnauthorized: false // Optional, for self-signed certificates
    }
});

export const requestCollege = async (req, res) => {
    const { name, city, state, nirfRank, rank } = req.body;

    // Logic to save the college request into your database, if needed...
    const email = process.env.Email;
    // Send email logic
    const mailOptions = {

       
        from: email,
        to: email,
        subject: 'College Addition Request',
        text: `Request details: \nName: ${name} \nCity: ${city} \nState: ${state} \nNIRF Rank: ${nirfRank} \nRank: ${rank}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error });
        }
        res.status(200).json({ message: 'Request submitted successfully and email sent!' });
    });
};


// Fetch college details by ID
export const getCollegeById = async (req, res) => {
    try {
        const { collegeId } = req.params;
        const college = await CollegeDetail.findById(collegeId);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching college details', error });
    }
};

// Fetch all college details or search by name
export const getAllColleges = async (req, res) => {
    const { name } = req.query;
    try {
        let collegeDetails;
        if (name) {
            // Use case-insensitive search
            const regex = new RegExp(name, 'i');
            collegeDetails = await CollegeDetail.find({ name: regex });
        } else {
            collegeDetails = await CollegeDetail.find();
        }
        res.json(collegeDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
