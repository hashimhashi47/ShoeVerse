import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    let alive = true;
    axios
      .get("http://localhost:5001/products")
      .then((res) => { if (alive) setAllProducts(res.data || []); })
      .catch((err) => console.error(err));
    return () => { alive = false; };
  }, []);


  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setNoResult(false);
      return;
    }

    const matches = allProducts.filter((p) => {
      const fields = [
        p.name,
        p.brand,
        p.category,
        p.descreption, 
        p.color,
        Array.isArray(p.tags) ? p.tags.join(" ") : p.tags,
      ].filter(Boolean);
      return fields.some((v) => String(v).toLowerCase().includes(q));
    });

    setSuggestions(matches.slice(0, 8)); 
    setNoResult(matches.length === 0);
  }, [searchQuery, allProducts]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      if (suggestions[0]) {
        navigate(`/products/${suggestions[0].id}`);
      } else {
        setNoResult(true);
      }
    }
  };

  return (
    <div className="hidden md:flex flex-1 max-w-xs relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for shoes..."
        className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {(suggestions.length > 0 || noResult) && (
        <ul className="absolute top-10 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                navigate(`/products/${item.id}`);
                setSuggestions([]); 
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="truncate">{item.name}</span>
            </li>
          ))}

          {noResult && (
            <li className="px-3 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
