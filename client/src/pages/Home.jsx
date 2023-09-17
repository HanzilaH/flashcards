import React, { useState, useContext, useEffect } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import Subjectlist from "../components/Subjectlist";
import Subject from "./Subject";
import Subjectview from "../components/Subjectview";
import Subjectflash from "../components/Subjectflash";
import QuestionStore from "../components/QuestionStore";
import Navbar from "../components/Navbar";

const Home = () => {
  const { currentSubject, setCurrentSubject } = useContext(DataContext);
  const [showSubject, setShowSubject] = useState(false);

  const [showSubjectList, setShowSubjectList] = useState(true);

  const [showSubjectView, setShowSubjectView] = useState(false);
  const [showSubjectFlash, setShowSubjectFlash] = useState(false);
  const [showQuestionStore, setShowQuestionStore] = useState(false);

  const navigate = useNavigate();

  const handleSubjectNameClick = (el) => {
    console.log(el);
    setCurrentSubject(el);
    // setShowSubject(true);
    setShowSubjectList(!showSubjectList);
    setShowSubjectView(!showSubjectView);
  };

  const [questionJSON, setQuestionJSON] = useState({
    question: "",
    answer: "",
  });

  const handleQuestionClick = (e) => {
    setQuestionJSON(e);
    setShowSubjectView(!showSubjectView);
    setShowQuestionStore(!showQuestionStore);
    console.log(e);
  };

  const handleStartClick = () => {
    setShowSubjectView(!showSubjectView);
    setShowSubjectFlash(!showSubjectFlash);
  };

  const handleNavbarHomeClicked = () => {
    setShowSubjectView(false);
    setShowSubjectFlash(false);
    setShowSubjectList(true);
    setShowQuestionStore(false);
  };

  return (
    <>
      <Navbar onHomeButtonClick={handleNavbarHomeClicked}></Navbar>
      {showSubjectList ? (
        <Subjectlist
          onClickSubjectName={(e) => handleSubjectNameClick(e)}
        ></Subjectlist>
      ) : null}

      {showSubjectView ? (
        <Subjectview
          onQuestionClick={handleQuestionClick}
          onStartClick={handleStartClick}
          onBackClick={() => {
            setShowSubjectView(!showSubjectView);
            setShowSubjectList(!showSubjectList);
          }}
        />
      ) : null}
      {showSubjectFlash ? (
        <Subjectflash onHomeClick={handleStartClick} />
      ) : null}
      {showQuestionStore ? (
        <QuestionStore
          questionJSON={questionJSON}
          onDoneClick={handleQuestionClick}
        />
      ) : null}
    </>
  );
};

export default Home;
