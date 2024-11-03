import Review from '../models/Review.js';

export const getReviewsByCollegeId = async (req, res) => {
    try {
        const { collegeId } = req.params; // Extract collegeId from the request parameters
        const reviews = await Review.find({ collegeId });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

export const addReview = async (req, res) => {
    try {
        const { collegeId } = req.params; // Extract collegeId from the request parameters
        const { review, rating } = req.body;

        const newReview = new Review({ 
            collegeId, // Correctly associate the review with collegeId
            review, 
            rating 
        });
        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

