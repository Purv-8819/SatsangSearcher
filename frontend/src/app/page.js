"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorTerm, setErrorTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [count, setCount] = useState(1);

  const handleSearch = async () => {
    const trimmed = searchTerm.trim();
    setCount(count * -1);
    if (!trimmed) return;

    try {
      const url = new URL("http://localhost:8000/search/");
      url.searchParams.append("payload", trimmed);

      const res = await fetch(url.toString());
      const data = await res.json();

      setResults((data["results"] || []).slice(0, 5)); // Only show top 5
    } catch (err) {
      setErrorTerm("Search failed");
      setErrorMessage(err.toString());
    }
  };

  const handleResultClick = async (item) => {
    setSelectedPath("");
    setSelectedPath(item.path);
    setSelected(item.name);
    setSelectedText("Loading...");
    setIsModalVisible(true);

    try {
      const url = new URL("http://localhost:8000/search/text/");
      url.searchParams.append("path", item.path);

      const res = await fetch(url.toString());
      const data = await res.json();

      setSelectedText(data.text || "No content found.");
    } catch (err) {
      setErrorTerm("Load failed");
      setErrorMessage(err.toString());
      setSelectedText("Failed to load content.");
    }
  };

  // Disable scroll when document panel is open
  useEffect(() => {
    if (selectedPath) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPath]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-amber-50 to-white text-black font-sans px-6 py-12 sm:px-20 select-none">
      <div className="flex max-w-7xl mx-auto h-[80vh] shadow-2xl rounded-xl overflow-hidden ring-1 ring-amber-200">
        {/* LEFT PANEL */}
        <section className="flex flex-col w-2/5 bg-white p-8 space-y-8">
          <h1 className="text-4xl font-extrabold text-amber-900 tracking-wide select-text">
            Satsang Searcher 🔍
          </h1>

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search scriptures, discourses..."
            className="mt-2 px-5 py-3 text-lg rounded-xl border border-amber-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-amber-400 focus:border-transparent transition duration-300 placeholder:text-amber-300"
            autoComplete="off"
          />

          <button
            onClick={handleSearch}
            className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-amber-700 focus:ring-4 focus:ring-amber-400 focus:outline-none transition"
          >
            Search
          </button>

          <div className="mt-4 flex flex-col gap-4 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100">
            {results.length === 0 && (
              <p className="text-center text-amber-400 select-text">
                No results yet. Try searching!
              </p>
            )}
            <div key={count} className="flex flex-col gap-4 animate-fade-in">
              {results.slice(0, 5).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleResultClick(item)}
                  className="text-left p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 font-semibold shadow-md hover:bg-amber-100 hover:shadow-lg transition transform hover:-translate-y-1 focus:ring-4 focus:ring-amber-300 focus:outline-none animate-fade-in"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section
          className={`relative w-3/5 bg-white p-10 border-l border-amber-200 flex flex-col transition-all duration-500 ease-in-out`}
        >
          {selectedPath ? (
            <>
              <button
                onClick={() => {
                  setSelectedPath(null);
                  setSelectedText("");
                }}
                className="absolute top-6 right-6 text-gray-500 hover:text-amber-600 text-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full p-1"
                aria-label="Close document"
              >
                &times;
              </button>

              <h2 className="text-3xl font-extrabold mb-6 text-amber-900 tracking-wide select-text">
                {selected}
              </h2>

              <div
                key={selectedPath}
                className="overflow-y-auto whitespace-pre-wrap text-gray-900 flex-grow pr-2 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100 animate-fade-in"
              >
                {selectedText}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-amber-400 h-full w-full animate-fadeIn">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-medium">No document selected</h3>
              <p className="text-sm text-gray-400 mt-2">
                Search and click a result to view its content here.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ERROR MODAL */}
      {errorTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="bg-red-100 rounded-xl p-8 w-full max-w-lg shadow-2xl relative ring-1 ring-red-400">
            <button
              onClick={() => {
                setErrorTerm("");
                setErrorMessage("");
              }}
              className="absolute top-4 right-4 text-red-600 hover:text-red-900 text-2xl font-bold focus:outline-none"
              aria-label="Close error message"
            >
              ×
            </button>
            <h1 className="text-xl font-bold mb-4 text-red-800">{errorTerm}</h1>
            <pre className="whitespace-pre-wrap text-red-700 font-mono">
              {errorMessage}
            </pre>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full flex flex-col items-center gap-4 mt-16 text-center select-text">
        <a
          className="flex items-center gap-3 text-sm bg-black/10 text-gray-600 hover:text-amber-600 hover:underline transition"
          href="https://www.baps.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className=" bg-black/10 rounded-md p-2">
            <Image
              aria-hidden="true"
              src="/footer.png"
              alt="BAPS logo"
              width={250}
              height={250}
              className="object-contain"
            />
          </div>
          Visit BAPS.org
        </a>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Mandir Search
        </p>
      </footer>
    </div>
  );
}
