import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Trending = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:5000/data");
        const data = await res.json();
        setRecentPosts(data.reverse().slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch trending data", err);
      }
    };
    fetchTrending();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-950 to-black text-white"
    : "bg-gradient-to-br from-indigo-50 to-white text-gray-900";

  const cardBg = darkMode
    ? "bg-black/60 backdrop-blur-md shadow-slate-800 text-white"
    : "bg-white/60 backdrop-blur-md text-gray-900 shadow-md";

  const categoryColor = darkMode ? "text-fuchsia-400" : "text-fuchsia-700";
  const titleColor = darkMode ? "text-sky-400" : "text-blue-800";
  const descColor = darkMode ? "text-gray-200" : "text-gray-800";
  const dateColor = darkMode ? "text-rose-300" : "text-rose-500";

  return (
    <section className={`min-h-screen py-10 px-6 transition-all duration-500 ${bgClass}`}>
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleDarkMode}
          className="text-2xl hover:rotate-12 transition-transform duration-300"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-blue-600" />
          )}
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-cyan-400">
        🚀 Trending Now
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recentPosts.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 ease-in-out shadow-lg ${cardBg}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <p className={`uppercase text-xs font-semibold tracking-wide ${categoryColor}`}>
                {item.category}
              </p>
              <h3 className={`text-lg font-bold ${titleColor}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-snug ${descColor}`}>
                {item.description.slice(0, 160)}...
              </p>
              <p className={`text-xs mt-1 italic ${dateColor}`}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
