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
  const { currentSubject, setCurrentSubject } = useContext(DataContext);
  const [subjectFlash, setSubjectFlash] = useState(false);

  const handleStartClick = () => {
    setSubjectFlash(true);
  };

  const handleSubjectNameClick = (el) => {
    console.log(el);
    setCurrentSubject(el);
    setSubjectFlash(false);
  };

  const mainRenderingFunction = () => {
    if (currentSubject === null) {
      return (
        <Subjectlist
          onClickSubjectName={(e) => handleSubjectNameClick(e)}
        ></Subjectlist>
      );
    } else {
      return !subjectFlash ? (
        <Subjectstore onStartClick={handleStartClick} />
      ) : (
        <Subjectflash />
      );
    }
  };

  return <>{mainRenderingFunction()}</>;
};

export default Home;
