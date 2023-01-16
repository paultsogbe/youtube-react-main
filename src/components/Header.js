import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/youtube_logo.png";
import SearchBar from "./SearchBar";
import meta from "../assets/MetaMask_logo.png";
import OpenApp from "react-open-app";

const Header = ({ profile, searchResult }) => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="header-logo" src={logo} alt="youtube" />
      </div>
      <div
        onKeyDown={() => {
          navigate("/search");
        }}
      >
        <SearchBar searchResult={searchResult} />
      </div>

      <div>
        {profile ? (
          <div className="logged-in">
            {/* <button
              className="button-logout"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log out
            </button> */}
            <img
              classname="profile-image"
              src={meta}
              alt="user"
              style={{ height: "60px" }}
              onClick={() => {
                navigate("/login");
              }}
            />
            {/* <img classname="profile-image" src={profile.imageUrl} alt="user" /> */}
            {/* <p className="profile-name">{profile.enName}</p> */}
          </div>
        ) : (
          <button
            className="button-login"
            onClick={() => {
              <OpenApp href="https://metamask.io/download/">MetaMask</OpenApp>;
            }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
