import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Page/Home";  // Import your Home component
import MoviesDetails from "./Components/Page/MoviesDetails";
import NotFound from "./Components/Page/NotFound";
import Navbar from "./Components/Navbar";
import PopularSection from "./Components/Page/PopularSection";
import UpcomingSection from "./Components/Page/UpcomingSection";
import TopRatedSection from "./Components/Page/TopRatedSection";
import About from "./Components/Page/About";
import Profile from "./Components/Page/Profile";

function App() {
  return (
    <div className="text-2xl">
        <Navbar />
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route exact path="/about" element={<About />} />
  <Route exact path="/profile" element={<Profile />} />
  <Route exact path="/movies/:id" element={<MoviesDetails />} />
  <Route exact path="/popular/movies/:id" element={<MoviesDetails />} />
  <Route exact path="/upcoming/movies/:id" element={<MoviesDetails />} />
  <Route exact path="/top_rated/movies/:id" element={<MoviesDetails />} />
  <Route exact path="/popular" element={<PopularSection />} />
  <Route exact path="/upcoming" element={<UpcomingSection />} />
  <Route exact path="/top_rated" element={<TopRatedSection />} />
  <Route path="*" element={<NotFound />} />  
</Routes>
    </div>
  );
}

export default App;