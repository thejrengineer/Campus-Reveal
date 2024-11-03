import express from 'express';
import { addReview, getReviewsByCollegeId } from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true }); // Enable mergeParams to access collegeId

// Route to fetch all reviews for a specific college
router.get('/', getReviewsByCollegeId); // Fetch reviews for a specific college

// Route to add a review for a college
router.post('/', addReview); // Add review for a specific college

export default router;
