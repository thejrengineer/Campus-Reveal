import React,{useState,useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Home = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

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

    if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by college name"
                    className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Request to Add College</button>
            </div>

            {/* College Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <Skeleton height={30} width="80%" />
                            <Skeleton height={20} width="60%" className="mt-2" />
                            <Skeleton height={20} width="40%" className="mt-2" />
                            <Skeleton height={40} width="100%" className="mt-4" />
                        </div>
                    ))
                    : currentColleges.map((college) => (
                        <div key={college._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold text-blue-600">{college.name}</h2>
                            <p>{college.city}, {college.state}</p>
                            <p>NIRF Rank: {college.nirfRank}</p>
                            <Link to={`/college/${college._id}/reviews`}>
                                <button className="w-full bg-blue-500 text-white py-2 rounded-lg">See Review</button>
                            </Link>
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'} hover:bg-blue-600 transition duration-300`}>
                    Previous
                </button>
                <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'} hover:bg-blue-600 transition duration-300`}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
