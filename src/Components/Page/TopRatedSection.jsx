import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import Spinner from '../Spinner/Spinner';
import Nextbutton from '../Nextbutton';

const TopRatedSection = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = (page) => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=e2353e8be47078e49467938753585fc2&language=en-US&page=${page}`
      )
      .then((response) => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner/>
      </div>
    );
  }

  return (
    <div>
      {/* Movies Section */}

      <div className="flex flex-wrap gap-y-10 mt-[8rem] gap-x-[4rem] justify-center">
        {
          data.map((movie, index) => (
            <div key={index}>
              <MovieCard {...movie} isLoading = {isLoading}  />
            </div>
          ))
        }
      </div>

      {/* Pagination Buttons */}



<Nextbutton setPage={setPage} page={page} />

    </div>
  );
};

export default TopRatedSection;
