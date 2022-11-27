import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import video from "../assets/video_example.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Video = ({ profile }) => {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://youtube-premium-express.herokuapp.com/video/${params.id}`
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="video-container">
      <div className="video-top-card">
        <div className="video-title">
          <span className="video-main-title">{data.title}</span>
          <span className="video-description">{data.description}</span>
        </div>
        <span className="video-duration">{data.duration}</span>
      </div>

      <video
        src={video}
        width="1500"
        height="750"
        controls="controls"
        autoPlay={true}
        className={profile ? "not-blured" : "blured"}
      />

      <div className="video-engagement">
        <span className="video-views">{data.views} views</span>
        <div className="video-reactions">
          <div className="video-likes">
            <FontAwesomeIcon
              icon="thumbs-up"
              className="video-thumpsup-input-icon"
            />

            <span>{data.like}</span>
          </div>
          <div className="video-dislikes">
            <FontAwesomeIcon
              icon="thumbs-down"
              className="video-thumpsdown-input-icon"
            />
            <span>{data.dislike}</span>
          </div>
        </div>
      </div>
      {/* <div className="video-comments">
        {data.comments.map((item, index) => {
          return (
            <>
              <div>
                <div className="comment-id">
                  <p className="user">{item.user}</p>
                  <p className="date">{Date(item.date)}</p>
                </div>
                <p className="comment">{item.text}</p>
              </div>
              <hr width="100%" size="2" align="center"></hr>
            </>
          );
        })}
      </div> */}
    </div>
  );
};

export default Video;
