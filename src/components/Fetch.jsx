import React, { useState, useEffect } from "react";

// All UseStates
const Fetch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/data");
        const data = await res.json();
        setData(data.reverse());
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    }

    fetchData();

    // Load bookmarks from localStorage
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarkedItems(savedBookmarks);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Read More / Less
  const toggleExpand = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle Bookmark
  const toggleBookmark = item => {
    const isBookmarked = bookmarkedItems.some(b => b.id === item.id);
    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = bookmarkedItems.filter(b => b.id !== item.id);
    } else {
      updatedBookmarks = [...bookmarkedItems, item];
    }
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
  };

  // Filter data based on search
  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderColor = isDarkMode ? "border-white" : "border-black";

  return (
    <section
      className={`font-serif body-font ${bgColor} ${textColor} min-h-screen`}
    >
      {/* UI Omitted for brevity above here */}
      {/* News Ticker / Scrolling Section */}
      <h2 className="text-2xl font-bold mb-4 text-center pt-2">
        📰 Latest Headlines
      </h2>
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-black to-blue-900 py-2">
        <div className="animate-marquee whitespace-nowrap flex hover:pause">
          {filteredData.slice(0, 10).map((item, index) =>
            <div
              key={index}
              className="mx-8 text-sm md:text-base text-blue-400 font-semibold hover:text-yellow-400 transition-colors duration-200"
            >
              {item.title}
              <span className="mx-6 text-gray-400">||</span>
            </div>
          )}
        </div>
      </div>
      {/* <div className="" />
      <h2 className="text-2xl font-bold mb-4 text-center pt-2">
        Latest Headlines
      </h2>
      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex">
          {filteredData.slice(0, 10).map((item, index) =>
            <div
              key={index}
              className="inline-block px-6 text-sm md:text-base text-blue-400 font-semibold"
            >
              {item.title}
              <span className="mx-6 text-gray-400">||</span>
            </div>
          )}
        </div>
      </div> */}
      <div className="container px-5 py-5 mx-auto">
        {/* Search + Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search News..."
            className={`px-4 py-2 w-full sm:w-1/6 rounded-md placeholder-gray-600 focus:outline-none ${isDarkMode
              ? "bg-white text-black"
              : "bg-gray-00 text-black"}`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode
              ? <svg
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m0 12.728l1.414-1.414M18.364 5.636l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              : <svg
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>}
          </button>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-wrap -m-4">
          {filteredData.length > 0
            ? filteredData.map(item =>
                <div key={item.id} className="p-4 md:w-1/3">
                  <div
                    className={`h-full rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition duration-300 ease-in-out 
    ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
  `}
                  >
                    {/* <div
                  className={`h-full border-2 rounded-lg overflow-hidden ${bgColor} ${borderColor}`}
                > */}

                    <img
                      className="lg:h-72 md:h-36 w-full object-cover object-center"
                      src={item.image}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium animate-pulse text-lime-500 mb-1">
                        {item.category}
                      </h2>
                      <h4 className="mb-2">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </h4>

                      {/* Bookmark on Title Click */}
                      <h1
                        onClick={() => toggleBookmark(item)}
                        className={`title-font text-lg font-medium font-sans mb-3 cursor-pointer transition ${bookmarkedItems.some(
                          b => b.id === item.id
                        )
                          ? "text-yellow-400"
                          : "text-blue-400 hover:text-yellow-400"}`}
                        title={
                          bookmarkedItems.some(b => b.id === item.id)
                            ? "Bookmarked!"
                            : "Click to Save"
                        }
                      >
                        {item.title}
                      </h1>

                      <p className="leading-relaxed mb-3">
                        {expandedItems[item.id]
                          ? item.description
                          : `${item.description.slice(0, 100)}...`}
                        {expandedItems[item.id] &&
                          item.moreContent &&
                          <span className="block mt-2 text-sm text-gray-400">
                            {item.moreContent}
                          </span>}
                      </p>

                      <div className="flex items-center flex-wrap">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-red-400 inline-flex items-center md:mb-2 lg:mb-0 focus:outline-none"
                        >
                          {expandedItems[item.id] ? "Show Less" : "Read More"}
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </button>

                        <span
                          className={`mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 ${isDarkMode
                            ? "text-white border-white"
                            : "text-black border-black"}`}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {Math.floor(Math.random() * 9000 + 1000)}
                        </span>

                        <span
                          className={`inline-flex items-center leading-none text-sm ${isDarkMode
                            ? "text-green-400"
                            : "text-green-700"}`}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                          </svg>
                          {Math.floor(Math.random() * 500 + 50)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            : <p className="text-center w-full">No blog posts found.</p>}
        </div>
      </div>
      {/* Highlights Section. */}
      {/* Scrolling Ticker Section With Images (Below Cards) */}
      <h2 className="text-2xl font-bold mb-4 text-center mt-16">
        🌟 News Highlights
      </h2>
      <div className="relative overflow-hidden bg-gray-900 border-t border-b border-gray-700 py-3">
        <div className="marquee animate-marquee flex items-center whitespace-nowrap gap-x-10">
          {filteredData.map((item, idx) =>
            <div
              key={idx}
              className="flex items-center space-x-3 min-w-fit px-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-400 shadow-md"
              />
              <p className="text-green-400 font-semibold text-sm truncate max-w-xs hover:text-yellow-300 transition-colors duration-300">
                {item.title}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-16" />
      <h2 className="text-2xl font-bold mb-4 text-center">News Highlights</h2> */}
      {/* Left to Right */}
      {/* <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          {filteredData.map((item, idx) =>
            <div key={idx} className="inline-flex items-center mx-4 pb-5">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-full mr-2"
              />
              ||
              <p className="text-sm font-semibold text-green-500">
                {item.title}
              </p>
            </div>
            
          )}
        </div>
      </div>
       */}

      {/* News Highlights Section above */}
      {/* Footer Section */}
      <footer
        className={`mt-16 px-6 py-8 border-t ${borderColor} ${bgColor} ${textColor}`}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">inshorts</span>
          </div>
          <div className="text-sm text-gray-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} inshorts. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Fetch;
