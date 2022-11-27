import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";

const Search = ({ results, profile }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        {results ? (
          <div className="home-card-wrapper">
            {results.map((element, index) => {
              console.log(results);
              console.log(element);
              console.log(element.id);
              return (
                <div onClick={() => navigate(`/video/${element.id}`)}>
                  <Card
                    key={index}
                    data={element}
                    className="search-card"
                    profile={profile}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <span>No results found</span>
        )}
      </div>
    </>
  );
};

export default Search;
