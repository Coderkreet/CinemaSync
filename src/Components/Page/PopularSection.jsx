import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Nextbutton from '../Nextbutton';

const PopularSection = () => {

    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    useEffect(() => {
      fetchMovies(page);
    }, [page]);
    const API_KEY = process.env.REACT_APP_API_KEY_TMDB;

    const fetchMovies = (page) => {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        )
        .then((response) => {
          setdata(response.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setIsLoading(false);
        });
    };


    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner/>
        </div>
      );
    }
  return (
    <div>
           <div className='flex flex-wrap gap-y-10 gap-x-[4rem] mt-[8rem]  justify-center'>
        {
          data.map((movie, index) => (
            <div key={index}>
              <MovieCard {...movie} isLoading = {isLoading} />
            </div>
          ))
        }
      </div>
      <Nextbutton setPage={setPage} page={page} />

      
    </div>
  )
}

export default PopularSection
