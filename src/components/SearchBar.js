import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ searchResult }) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        onChange={(event) => searchResult(event)}
        placeholder="What video are you looking for ?"
      />
      <FontAwesomeIcon icon="search" className="search-input-icon" />
    </div>
  );
};

export default SearchBar;
