import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/MoviesLogo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const API_KEY = 'e2353e8be47078e49467938753585fc2'; // Replace with your TMDB API key

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            {
              params: {
                query: searchTerm,
                api_key: API_KEY,
              },
            }
          );
          setSearchResults(response.data.results || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsSearching(false);
        }
      };
      fetchMovies();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, API_KEY]);

  return (
    <div
      className={`w-full  fixed h-[4rem] top-0 z-50 transition duration-300 ${
        isScrolled ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-[98%] max-w-7xl mx-auto py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-1 flex justify-start items-center">
          <Link className="flex items-center" to="/">
            <img src={logo} alt="CinemaSync Logo" className="w-12 md:w-16" />
            <span className="text-white text-lg md:text-xl font-bold ml-2">
              CinemaSync
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden lg:flex md:flex justify-center items-center relative">
          <div className="w-full focus:border max-w-[400px]">
            <input
              type="text"
              className="w-full py-2 h-[2rem] text-[0.8rem] px-4 bg-transparent text-white rounded-md focus:outline-none focus:ring-0 "
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && searchResults.length > 0 && (
              <ul className="absolute w-full mt-2 bg-black rounded-lg  max-h-60 overflow-y-auto shadow-lg z-50">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="px-4 py-2 hover:bg-gray-700 transition"
                  >
                    <Link
                      to={`/movies/${movie.id}`}
                      className="block text-[0.9rem] text-white"
                      onClick={() => setSearchTerm('')}
                    >                      
                      {movie.title} ({movie.release_date?.split('-')[0] || 'N/A'})
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {isSearching && (
              <div className="absolute w-full mt-2 bg-gray-800 text-white rounded-lg py-2 px-4">
                Searching...
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex-[15%] flex justify-end items-center">
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } absolute top-full font-thin text-[0.8rem] left-0 w-full bg-gray-900 bg-opacity-90 md:bg-transparent md:static md:flex gap-x-5 text-lg text-white`}
          >
            <Link
              to="/about"
              className="block py-2 px-4 hover:text-indigo-400 transition md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/popular"
              className="block py-2 px-4 hover:text-indigo-400 transition md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              to="/top_rated"
              className="block py-2 px-4 hover:text-indigo-400 transition md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Top Rated
            </Link>
            <Link
              to="/upcoming"
              className="block py-2 px-4 hover:text-indigo-400 transition md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Upcoming
            </Link>
            <Link
              to="/profile"
              className="block py-2 px-4 hover:text-indigo-400 transition md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
