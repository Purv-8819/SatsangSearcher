"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorTerm, setErrorTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedText, setSelectedText] = useState("");

  const handleSearch = async () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    try {
      const url = new URL("http://localhost:8000/search/");
      url.searchParams.append("payload", trimmed);

      const res = await fetch(url.toString());
      const data = await res.json();

      console.log(data);

      setResults(data["results"] || ["FAIL"]); // Adapt based on your API shape
    } catch (err) {
      setErrorTerm("Search failed");
      setErrorMessage(err.toString());
      // console.error("Search failed:", err);
    }
  };

  const handleResultClick = async (item) => {
    setSelectedPath(item.path);
    setSelected(item.name);
    setSelectedText("Loading...");

    try {
      const url = new URL("http://localhost:8000/search/text/");
      url.searchParams.append("path", item.path);

      const res = await fetch(url.toString());
      const data = await res.json();

      setSelectedText(data.text || "No content found.");
    } catch (err) {
      setErrorTerm("Load failed");
      setErrorMessage(err);
      setSelectedText("Failed to load content.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12 sm:px-20 bg-white text-black font-sans">
      {/* Main Content */}
      <main className="flex flex-col items-center sm:items-start w-full max-w-2xl gap-8 mt-24">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center sm:text-left">
          Satsang Searcher
        </h1>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search scriptures, discourses..."
          className="w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
        />

        {errorTerm != "" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className=" bg-red-300 rounded-lg p-6 w-[75vw] max-w-xl max-h-[80vh] flex flex-col shadow-xl relative">
              <button
                onClick={() => {
                  setErrorTerm("");
                  setErrorMessage("");
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h1 className="text-lg font-bold mb-2">{errorTerm}</h1>
              <h2 className="text-lg font-bold mb-2">{errorMessage}</h2>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="w-full">
          {results.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleResultClick(item)}
              className="block w-full text-left text-amber-800 bg-amber-50 hover:bg-amber-100 transition p-3 rounded-md mb-2 border border-amber-200 shadow-sm"
            >
              <p className="font-semibold truncate">{item.name}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedPath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg p-6 w-[75vw] max-w-xl max-h-[80vh] flex flex-col shadow-xl relative">
            <button
              onClick={() => {
                setSelectedPath(null);
                setSelectedText("");
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-2">{selected}</h2>

            <div className="overflow-y-auto text-gray-800 whitespace-pre-wrap flex-grow">
              {selectedText}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full flex flex-col items-center gap-4 mt-24">
        <a
          className="flex items-center gap-2 text-sm text-gray-600 hover:underline"
          href="https://www.baps.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/footer.png"
            alt="BAPS logo"
            width={100}
            height={100}
          />
          Visit BAPS.org
        </a>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Mandir Search
        </p>
      </footer>
    </div>
  );
}
