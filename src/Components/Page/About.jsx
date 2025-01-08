'use client'

import React from "react";
import { motion } from "framer-motion";
import { Film, Star, List, Tv, Users } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    { icon: <Film className="w-8 h-8" />, text: "Explore a vast collection of movies from various genres" },
    { icon: <Star className="w-8 h-8" />, text: "Check out detailed movie descriptions, cast, and crew information" },
    { icon: <Tv className="w-8 h-8" />, text: "Watch trailers and teaser videos for upcoming films" },
    { icon: <List className="w-8 h-8" />, text: "Stay updated with trending movies and popular picks" },
    { icon: <Users className="w-8 h-8" />, text: "Create a personalized watchlist for easy access to your favorite films" }
  ];

  return (
    <div className="min-h-screen mt-[6rem] bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-red-600"
          {...fadeInUp}
        >
          About CinemaSync
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 mb-12 text-center"
          {...fadeInUp}
        >
          Your ultimate destination for cinematic exploration and discovery
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div {...fadeInUp}>
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="CinemaSync Interface"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div {...fadeInUp} className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Discover the Magic of Cinema</h2>
            <p className="text-lg text-gray-300">
              CinemaSync is your go-to platform for discovering and exploring movies. Our user-friendly interface makes it easy to find and learn about movies in just a few clicks, whether you're looking for the latest releases or timeless classics.
            </p>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-4xl font-bold mb-8 text-center"
          {...fadeInUp}
        >
          Why Choose CinemaSync?
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              {...fadeInUp}
            >
              <div className="mb-4 text-purple-400">
                {feature.icon}
              </div>
              <p className="text-lg">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
        >
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1720610706902-f92d98fb8b35?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Movie Watching Experience"
            className="w-full h-auto rounded-lg shadow-lg"
            {...fadeInUp}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Personalized Recommendations"
            className="w-full h-auto rounded-lg shadow-lg"
            {...fadeInUp}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Community Discussions"
            className="w-full h-auto rounded-lg shadow-lg"
            {...fadeInUp}
          />
        </motion.div>

        <motion.div 
          className="text-center"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">Join the CinemaSync Community</h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you're a casual viewer or a dedicated cinephile, CinemaSync enhances your movie-watching experience. Join our community of film enthusiasts and start your cinematic journey today!
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

