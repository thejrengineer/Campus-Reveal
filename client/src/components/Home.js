import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import logo from '../assets/CAMPUS REVEAL.png';
import Modal from 'react-modal';

const Home = () => {
    // State variables
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
    const [collegeDetails, setCollegeDetails] = useState({ name: '', city: '', state: '', nirfRank: '', rank: '' });

    const collegesPerPage = 20;

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            const response = await axios.get('https://campus-reveal-backend.vercel.app/api/colleges');
            setColleges(response.data);
        } catch (err) {
            setError('Error fetching college data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredColleges = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastCollege = currentPage * collegesPerPage;
    const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
    const currentColleges = filteredColleges.slice(indexOfFirstCollege, indexOfLastCollege);
    const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        resetCollegeDetails();
    };

    const openSuccessModal = () => setSuccessModalIsOpen(true);
    const closeSuccessModal = () => {
        setSuccessModalIsOpen(false);
        resetCollegeDetails();
    };

    const resetCollegeDetails = () => {
        setCollegeDetails({ name: '', city: '', state: '', nirfRank: '', rank: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollegeDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://campus-reveal-backend.vercel.app/api/colleges/request-college', collegeDetails);
            closeModal();
            openSuccessModal();
        } catch (error) {
            console.error('Error submitting college request:', error);
            //alert('There was an error submitting your request.');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Logo takes 20% of the width */}
        <div className="flex-grow md:flex-grow-0 md:w-1/5 flex justify-center md:justify-start">
            <img src={logo} alt="Logo" className="h-3"/> {/* Reduced logo size */}
        </div>

        {/* Search bar takes 60% of the width */}
        <div className="w-full md:w-3/5 flex items-center justify-center">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by college name"
                className="w-full h-15 p-3 pl-10 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
        </div>

        {/* Button takes 20% of the width */}
        <div className="flex-grow md:flex-grow-0 md:w-1/5 flex justify-center md:justify-end mt-4 md:mt-0">
            <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                Request to Add College
            </button>
        </div>
    </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentColleges.length > 0 ? (
                    currentColleges.map((college) => (
                        <div key={college._id} className="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 duration-300">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-blue-600">{college.name}</h2>
                                <span className="text-sm text-gray-500">NIRF Rank: {college.nirfRank}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full">{college.city}</span>
                                <span className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full">{college.state}</span>
                                <span className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full">Rank: {college.rank}</span>
                            </div>
                            <Link to={`/college/${college._id}/reviews`}>
                                <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">See Review</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-red-600">No colleges found</p>
                )}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'} hover:bg-blue-600 transition duration-300`}>Previous</button>
                <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'} hover:bg-blue-600 transition duration-300`}>Next</button>
            </div>

            {/* Modals */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
                <h2 className="text-xl font-semibold mb-4">Request to Add College</h2>
                <form onSubmit={handleSubmit}>
                    {['name', 'city', 'state', 'nirfRank', 'rank'].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block mb-1" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type="text"
                                name={field}
                                id={field}
                                value={collegeDetails[field]}
                                onChange={handleInputChange}
                                required
                                className="w-full h-12 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 transition duration-300"
                            />
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="bg-gray-300 text-black py-2 px-4 rounded-lg mr-2 hover:bg-gray-400 transition duration-300">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Submit</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={successModalIsOpen} onRequestClose={closeSuccessModal} ariaHideApp={false} className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
                <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
                <p>Your request to add a college has been successfully submitted. We will review it shortly!</p>
                <div className="flex justify-end mt-4">
                    <button onClick={closeSuccessModal} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
