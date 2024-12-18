import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // For skeleton loading
import 'react-loading-skeleton/dist/skeleton.css';

const Review = () => {
    const { collegeId } = useParams();
    const [college, setCollege] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [showRatingModal, setShowRatingModal] = useState(false); // Modal state
    const [isSubmitting, setIsSubmitting] = useState(false); // For loading state during review submission
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // Success state

    useEffect(() => {
        fetchCollegeData();
        fetchReviews();
    }, [collegeId]);

    const fetchCollegeData = () => {
        axios.get(`https://campus-reveal-backend.vercel.app/api/colleges/${collegeId}`)
            .then(response => {
                setCollege(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching college data');
                setLoading(false);
            });
    };

    const fetchReviews = () => {
        axios.get(`https://campus-reveal-backend.vercel.app/api/colleges/${collegeId}/reviews`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(err => {
                console.error('Error fetching reviews:', err);
            });
    };

    const handleAddReview = () => {
        if (rating === 0) {
            setShowRatingModal(true); // Show modal if rating is 0
            return;
        }

        setIsSubmitting(true); // Start the submission process
        setSubmissionSuccess(false); // Reset success message

        axios.post(`https://campus-reveal-backend.vercel.app/api/colleges/${collegeId}/reviews`, { 
            review: newReview, 
            rating 
        })
        .then(response => {
            setReviews(prevReviews => [...prevReviews, response.data]);
            setNewReview('');
            setRating(0);
            setIsSubmitting(false);
            setSubmissionSuccess(true); // Successfully added review
        })
        .catch(err => {
            console.error('Error adding review:', err);
            setIsSubmitting(false); // Stop loading
        });
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
            <span 
                key={index}
                className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(index + 1)}
            >
                ★
            </span>
        ));
    };

    const closeModal = () => {
        setShowRatingModal(false);
    };

    if (loading) return <div className="text-center mt-10 text-xl text-gray-600"><Skeleton height={30} width={200} /></div>;
    if (error) return <div className="text-center text-red-500 mt-10 text-lg">{error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {college && (
                <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">{college.name || <Skeleton width={200} />}</h1>
                    <div className="text-gray-600 mb-6 space-y-2">
                        <p><span className="font-bold">City:</span> {college.city || <Skeleton width={100} />}</p>
                        <p><span className="font-bold">State:</span> {college.state || <Skeleton width={100} />}</p>
                        <p><span className="font-bold">NIRF Rank:</span> {college.nirfRank || <Skeleton width={80} />}</p>
                        <p><span className="font-bold">Rank:</span> {college.rank || <Skeleton width={60} />}</p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews ({reviews.length})</h2>
                    <p className="text-gray-500 mb-4">
                        Please share genuine feedback and avoid offensive language. Your review helps others make informed decisions!
                    </p>

                    {/* Add Review */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-gray-600 mb-2">Please rate the college:</p>
                        <div className="flex items-center mb-3">
                            {renderStars()}
                        </div>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                            placeholder="Write your review here..."
                        />
                        <button
                            onClick={handleAddReview}
                            className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                            disabled={isSubmitting} // Disable button while submitting
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>

                    {/* Display Reviews */}
                    <div className="space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 shadow-md rounded-lg p-5 border border-gray-200"
                                >
                                    <div className="flex items-center mb-2">
                                        <p className="text-yellow-400 text-lg mr-2">{'★'.repeat(review.rating)}</p>
                                        <p className="text-gray-300 text-lg">{'☆'.repeat(5 - review.rating)}</p>
                                    </div>
                                    <p className="text-gray-800 mb-2">{review.review}</p>
                                    <p className="text-gray-500 text-sm">Posted on: {new Date(review.createdAt).toLocaleString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric', 
                                        hour: 'numeric', 
                                        minute: 'numeric', 
                                        hour12: true 
                                    })}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No reviews yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Rating Modal */}
            {showRatingModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Required</h3>
                        <p className="text-gray-600 mb-4">Please rate the college before submitting your review.</p>
                        <button
                            onClick={closeModal}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {submissionSuccess && !isSubmitting && (
                <div className="fixed inset-0 flex items-center justify-center bg-green-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Added Successfully!</h3>
                        <p className="text-gray-600 mb-4">Thank you for your feedback!</p>
                        <button
                            onClick={() => setSubmissionSuccess(false)}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;
