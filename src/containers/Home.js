import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { ColorRing } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroller";

const Home = ({ data, isLoading, profile }) => {
  const navigate = useNavigate();
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);
  const loadMore = () => {
    if (records === data.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setrecords(records + itemsPerPage);
      }, 2000);
    }
  };

  return isLoading ? (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  ) : (
    <>
      <div className="home-card-wrapper">
        {data &&
          data.map((card, index) => {
            return (
              <>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={hasMore}
                  loader={<h4 className="loader">Loading...</h4>}
                  useWindow={false}
                >
                  {
                    <div onClick={() => navigate(`video/${card.id}`)}>
                      <Card key={index} data={card} profile={profile} />
                    </div>
                  }
                </InfiniteScroll>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Home;
