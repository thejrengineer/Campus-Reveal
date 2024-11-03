// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  review: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now } // Add createdAt field
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
