import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, poster_path, release_date, vote_average, overview, id, isLoading }) => {
  // TMDb base URL for poster images
  const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;

if (isLoading) {
  return(
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="w-72 h-[450px]">
            <Skeleton height={300} duration={2} />
            <Skeleton height={20} width="60%" style={{ marginTop: 10 }} />
            <Skeleton height={20} width="40%" />
          </div>
        </SkeletonTheme>
  )
}

  return (
    <div>
        <Link to={`movies/${id}`}>
          <div className="relative w-72 h-[450px] bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Poster Image */}
            <img src={imageURL} alt={title} className="w-full h-full object-cover" />

            {/* Overlay with Movie Details */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div>
                <h1 className="text-white text-lg font-bold mb-1">{title}</h1>

                <div className="flex justify-between items-center text-gray-400 text-sm mb-3">
                  <span>{release_date}</span>
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500 mr-1"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.773 1.4 8.166L12 18.896l-7.334 3.854 1.4-8.166L.132 9.211l8.2-1.193L12 .587z" />
                    </svg>
                    {vote_average}
                  </span>
                </div>

                <p className="text-gray-300 text-sm">
                  {overview.slice(0, 200)}
                  {overview.length > 200 && '...'}
                </p>
              </div>
            </div>
          </div>
        </Link>
    </div>
  );
};

export default MovieCard;
