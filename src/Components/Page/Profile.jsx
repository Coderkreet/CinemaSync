import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Search, Star, Film, Award } from 'lucide-react';
import Spinner from "../Spinner/Spinner";

const API_KEY = "e2353e8be47078e49467938753585fc2";

const Profile = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActor, setSelectedActor] = useState(null);

  const fetchActors = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching actors:", error);
      return [];
    }
  };

  const loadMoreActors = async () => {
    const newActors = await fetchActors(page + 1);
    setActors([...actors, ...newActors]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchActors(1).then((initialActors) => {
      setActors(initialActors);
      setLoading(false);
    });
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${term}&page=1`
        );
        setActors(response.data.results);
      } else {
        const initialActors = await fetchActors(1);
        setActors(initialActors);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreActors();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [actors]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 text-white p-8">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-8"
      >
        Discover Popular Actors
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search actors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pl-10 bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </motion.div>

      {loading && actors.length === 0 ? (
        <p className=" flex justify-center items-center  text-gray-400"><Spinner/></p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {actors.map((actor) => (
            <motion.div
              key={actor.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-black p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedActor(actor)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{actor.name}</h2>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <p className="text-gray-300">Popularity: {actor.popularity.toFixed(1)}</p>
              </div>
              <div className="flex items-center">
                <Film className="w-4 h-4 text-blue-400 mr-1" />
                <p className="text-gray-300 text-sm">
                  Known for: {actor.known_for[0]?.title || actor.known_for[0]?.name || "N/A"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedActor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedActor(null)}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-black p-6 rounded-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedActor.profile_path}`}
                alt={selectedActor.name}
                className="w-1/3 h-auto rounded-lg mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedActor.name}</h2>
                <p className="text-gray-300 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 inline mr-1" />
                  Popularity: {selectedActor.popularity.toFixed(1)}
                </p>
                <p className="text-gray-300 mb-4">
                  <Award className="w-4 h-4 text-purple-400 inline mr-1" />
                  Known for department: {selectedActor.known_for_department}
                </p>
                <h3 className="text-xl font-semibold mb-2">Known For:</h3>
                <ul className="list-disc list-inside">
                  {selectedActor.known_for.map((work) => (
                    <li key={work.id} className="text-gray-300">
                      {work.title || work.name} ({work.media_type})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedActor(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {!loading && (
        <div className="flex justify-center mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"
          ></motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;

