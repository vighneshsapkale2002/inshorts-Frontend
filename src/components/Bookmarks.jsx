
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarks(stored);
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const containerStyle = darkMode
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
    : "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900";

  const cardStyle = darkMode
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-white hover:bg-gray-100";

  const modalStyle = darkMode
    ? "bg-black/80 backdrop-blur-md text-white"
    : "bg-white/80 backdrop-blur-md text-gray-900";

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${containerStyle} font-sans`}
    >
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-28 right-6 text-2xl p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-white shadow-lg transition"
        aria-label="Toggle Theme"
      >
        {darkMode ? <FaSun className="text-yellow-800" /> : <FaMoon className="text-blue-800" />}
      </button>

      <h1 className="text-4xl font-extrabold mb-8 text-center text-amber-400">
        📌 Your Bookmarked Posts
      </h1>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-400">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`rounded-lg overflow-hidden shadow-xl cursor-pointer transition transform hover:-translate-y-1 duration-300 ${cardStyle}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-emerald-400 mb-1 uppercase tracking-wide">{item.category}</p>
                <h2 className="text-xl font-semibold text-blue-400 mb-2">{item.title}</h2>
                <p className="text-sm line-clamp-3">{item.description?.slice(0, 120)}...</p>
                <p className="text-xs text-amber-500 mt-3">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 py-8">
          <div
            className={`relative max-w-3xl w-full rounded-xl p-6 overflow-y-auto max-h-[90vh] shadow-2xl ${modalStyle}`}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-3xl font-bold text-red-400 hover:text-red-600"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-emerald-400 uppercase mb-2">{selected.category}</p>
            <h2 className="text-3xl font-bold text-blue-400 mb-4">{selected.title}</h2>
            <p className="mb-4 text-base leading-relaxed whitespace-pre-line">
              {selected.description}
            </p>
            <p className="text-sm text-red-400">
              {new Date(selected.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
