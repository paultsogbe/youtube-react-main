import React from "react";
import video from "../assets/video_example.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ data, profile }) => {
  return (
    <div>
      <div className="card-container">
        <div className="top-card">
          <div className="title">
            <span className="main-title">{data.title}</span>
            <span className="description">{data.description}</span>
          </div>
          <span className="duration">{data.duration}</span>
        </div>

        <video
          src={video}
          width="400"
          height="200"
          controls="controls"
          autoPlay={true}
          className={profile ? "not-blured" : "blured"}
        />
        <div className="engagement">
          <span className="views">{data.views} views</span>
          <div className="reactions">
            <div className="likes">
              <FontAwesomeIcon
                icon="thumbs-up"
                className="thumpsup-input-icon"
              />
              <span>{data.like}</span>
            </div>

            <div className="dislikes">
              <FontAwesomeIcon
                icon="thumbs-down"
                className="thumpsdown-input-icon"
              />
              <span>{data.dislike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
