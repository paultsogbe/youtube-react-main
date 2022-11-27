import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import { gapi } from "gapi-script";
import axios from "axios";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Search from "./containers/Search";
import Video from "./containers/Video";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCheck,
  faRedo,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo, faThumbsUp, faThumbsDown);
function App() {
  const [profile, setProfile] = useState([]);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [data, setData] = useState([]);
  const [results, setResults] = useState(data.slice(0, 20));
  const [isLoading, setIsLoading] = useState(false);

  // SIGNUP AND LOGIN
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    console.log(profile);
  });

  // LIST OF VIDEOS

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://youtube-premium-express.herokuapp.com/videos`
      );

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // RECHERCHE

  const searchResult = (event) => {
    let newResults = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].tags.indexOf(event.target.value.toLowerCase()) !== -1) {
        if (newResults.length >= 20) {
          break;
        } else {
          newResults.push(data[i]);
        }
      }
    }
    setResults(newResults);
    console.log(newResults);
    console.log(event.target.value);
  };

  return (
    <Router>
      <Header profile={profile} searchResult={searchResult} />
      <Routes>
        <Route
          path="/"
          element={<Home data={data} isLoading={isLoading} profile={profile} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setProfile={setProfile}
              profile={profile}
              clientId={clientId}
            />
          }
        />
        <Route
          path="/search"
          element={<Search results={results} profile={profile} />}
        />
        <Route path="/video/:id" element={<Video profile={profile} />} />
      </Routes>
    </Router>
  );
}
export default App;
