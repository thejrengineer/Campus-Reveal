import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Your main component with college listings
import ReviewsPage from './components/Review'; // The new reviews page
import Landing from './components/Landing'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={< Landing/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/college/:collegeId/reviews" element={<ReviewsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
