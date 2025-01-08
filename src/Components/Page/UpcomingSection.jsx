import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard';
import Spinner from '../Spinner/Spinner';
import Nextbutton from '../Nextbutton';
import { motion } from "framer-motion";


const UpcomingSection = () => {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const API_KEY = 'e2353e8be47078e49467938753585fc2' ;
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    useEffect(() => {
      fetchMovies(page);
    }, [page]);

    const fetchMovies = (page) => {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
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
    <motion.div
    initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
            <div className='flex flex-wrap gap-y-10 gap-x-[4rem] mt-[8rem] justify-center'>
        {
          data.map((movie, index) => (
            <div key={index}>
              <MovieCard {...movie}  isLoading = {isLoading}  />
            </div>
          ))
        }
      </div>
      <Nextbutton setPage={setPage} page={page} />

    </motion.div>
  )
}


export default UpcomingSection
