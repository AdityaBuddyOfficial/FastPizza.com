import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  console.log("🚀 ~ SearchOrder ~ query:", query);
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    console.log("query", query);
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search Order"
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
