import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form action='#' onSubmit={handleSearch}>
      <input
      className="py-1 pl-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-full w-32 sm:w-64 placeholder:text-tone-400 placeholder:italic transition duration-150 ease-in-out"
        type='text'
        placeholder='Search order #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
