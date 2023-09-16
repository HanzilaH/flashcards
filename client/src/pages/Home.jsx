import React, { useState, useContext } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import Subjectlist from "../components/Subjectlist";

const Home = () => {
  const { currentSubject, setCurrentSubject } = useContext(DataContext);

  const navigate = useNavigate();

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
