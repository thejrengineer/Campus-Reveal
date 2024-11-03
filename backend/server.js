import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import collegeDetailsRouter from './routes/collegeRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Log the MongoDB URI for debugging


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
// Middleware
app.use(cors({
    origin: 'https://campusreveal.vercel.app', // Restrict to your specific frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Include cookies and HTTP authentication with requests
}));

app.options('*', cors()); // Handle preflight requests
app.use(express.json());

// Use the college details route
app.use('/api/colleges', collegeDetailsRouter);

// Use the review route
app.use('/api/colleges/:collegeId/reviews', reviewRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
