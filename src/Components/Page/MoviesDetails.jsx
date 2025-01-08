import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Spinner from "../Spinner/Spinner";
import { motion } from "framer-motion";

const MoviesDetails = () => {
  const API_KEY ='e2353e8be47078e49467938753585fc2'
  const API_KEY_YOUTUBE = 'AIzaSyCXKI1pviZwZCwF0jkLoaRME1WO9H4Y_B8'
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [getData]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(response.data);
      getTrailer(response.data.title);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const getTrailer = async (title) => {
    try {
      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title} trailer&key=${API_KEY_YOUTUBE}`
      );
      const video = youtubeResponse.data.items.find(
        (item) => item.id.kind === "youtube#video"
      );
      if (video) setTrailerId(video.id.videoId);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative text-white min-h-screen p-8 bg-gradient-to-b from-black via-gray-900 to-gray-800"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 mt-16 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Watch Trailer</h2>
        <YouTube
          videoId={trailerId}
          opts={{
            height: "390",
            width: "100%",
            playerVars: {
              autoplay: false,
            },
          }}
        />
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative align-middle max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 p-4 lg:p-8"
      >
        <div className="flex justify-center lg:justify-center h-fit">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg h-auto w-[300px] lg:w-[400px]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col justify-center space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-5xl font-bold"
          >
            {movie.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-gray-400"
          >
            Release Date: {movie.release_date}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="leading-relaxed"
          >
            {movie.overview}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex gap-4"
          >
            <span className="bg-green-500 text-white py-2 px-4 rounded shadow">
              Rating: {movie.vote_average}/10
            </span>
            <span className="bg-blue-500 text-white py-2 px-4 rounded shadow">
              Votes: {movie.vote_count}
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          >
            <div>
              <h3 className="text-lg font-medium">Genres</h3>
              <p>
                {movie.genres
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Runtime</h3>
              <p>{movie.runtime ? `${movie.runtime} minutes` : "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Budget</h3>
              <p>
                {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Revenue</h3>
              <p>
                {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MoviesDetails;

