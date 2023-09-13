import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DataContext from "../context/DataContext";
import Subjectstore from "../components/Subjectstore";
import Subjectflash from "../components/Subjectflash";
import Subjectlist from "../components/Subjectlist";
import Subjectview from "../components/Subjectview";

const Home = () => {
  const { currentSubject, setCurrentSubject } = useContext(DataContext);

  const navigate = useNavigate(); // Get the navigate function

  const handleSubjectNameClick = (el) => {
    console.log(el);
    setCurrentSubject(el);
    navigate("/subject"); // Navigate to the "/subject" route
  };

  return (
    <>
      <Subjectlist
        onClickSubjectName={(e) => handleSubjectNameClick(e)}
      ></Subjectlist>
    </>
  );
};

export default Home;
