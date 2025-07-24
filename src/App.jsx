import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fetch from "./components/Fetch";
import Bookmarks from "./components/Bookmarks";
import Trending from "./components/Trending";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fetch />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Router>
  );
}

export default App;
