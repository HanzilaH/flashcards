import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import DataContext from "../DataContext";
import Subjectstore from "../components/Subjectstore";
import Subjectflash from "../components/Subjectflash";
import Subjectlist from "../components/Subjectlist";

const Home = () => {
  const [subjectFlash, setSubjectFlash] = useState(false);

  const handleStartClick = () => {
    setSubjectFlash(true);
  };

  return (
    <>
      {/* {!subjectFlash ? (
        <Subjectstore onStartClick={handleStartClick} />
      ) : (
        <Subjectflash />
      )} */}
    </>
  );
};

export default Home;
