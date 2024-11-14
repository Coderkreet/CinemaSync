import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard';
import Spinner from '../Spinner/Spinner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // For navigation
  const API_KEY = process.env.REACT_APP_API_KEY_TMDB;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      )
      .then((response) => setData(response.data.results));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="w-[80vw] h-[460px] p-4 space-y-4">
            <Skeleton height={360} width="100%" duration={2} />
            <Skeleton height={24} width="80%" />
            <Skeleton height={20} width="60%" />
            <Skeleton height={18} width="40%" />
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
        >
          {data.map((movie, index) => (
            <div className="relative h-[90vh] text-white" key={index}>
              {/* Background Image with Gradient Overlay */}
              <img
                className="w-full h-full object-cover opacity-70"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

              {/* Movie Details Overlay */}
              <div className="absolute bottom-16 left-8 right-8 md:left-12 md:right-12 lg:left-16 lg:right-16 text-left space-y-4">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-md font-semibold">
                    {movie.vote_average.toFixed(1)} ★
                  </span>
                  <span>{movie.release_date}</span>
                </div>
                <p className="max-w-3xl text-gray-300 text-sm md:text-base leading-relaxed">
                  {movie.overview}
                </p>
                <button
                  className="px-6 py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                  onClick={() => navigate(`/movies/${movie.id}`)} // Navigate to movie details page
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      )}

      {/* Popular section */}
      <h2 className="text-white text-3xl pl-8 font-bold mb-9 mt-9">
        Popular Movies
      </h2>

      <div className="flex flex-wrap gap-y-10 gap-x-[4rem] justify-center">
        {data.map((movie, index) => (
          <div key={index}>
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
