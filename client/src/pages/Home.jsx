import React, { useState, useContext, useEffect, useCallback } from "react";
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

  const { data, addSubjectEntry, removeEntryBySubject } =
    useContext(DataContext);

  const [showSubjectList, setShowSubjectList] = useState(true);

  const [showSubjectView, setShowSubjectView] = useState(false);
  const [showSubjectFlash, setShowSubjectFlash] = useState(false);
  const [showQuestionStore, setShowQuestionStore] = useState(false);
  const [subjectArray, setSubjectArray] = useState([]);

  const navigate = useNavigate();

  const handleSubjectNameClick = useCallback((el) => {
    console.log(el);
    setCurrentSubject(el);
    // setShowSubject(true);
    setShowSubjectList(!showSubjectList);
    setShowSubjectView(!showSubjectView);
  }, [setCurrentSubject]);

  const [questionJSON, setQuestionJSON] = useState({
    question: "",
    answer: "",
  });

  const handleQuestionClick = (e) => {
    setQuestionJSON(e);
    // setShowSubjectView(!showSubjectView);
    // setShowQuestionStore(!showQuestionStore);
    console.log(e);
  };

  // const handleQuestionClick = (e) => {
  //   setQuestionJSON(e);
  //   setShowSubjectView(!showSubjectView);
  //   setShowQuestionStore(!showQuestionStore);
  //   console.log(e);
  // };


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

  const flashcardSet = () => {
    return <div className=" flashcard-set"></div>;
  };

  useEffect(() => {
    const transformedData = data.map((element) => (
      <div key={element.id} className="mb-5 col mx-4">
        <div
          onClick={() => handleSubjectNameClick(element.subject)}
          className="flashcard-set p-3 d-flex justify-content-center align-items-center text-center"
        >
          <div>{element.subject}</div>
        </div>
      </div>
    ));
    setSubjectArray(transformedData);
  }, [data, handleSubjectNameClick]);
  

  return (
    <>
      <Navbar onHomeButtonClick={handleNavbarHomeClicked}></Navbar>

      
      <div className="container">

        <div className="d-flex justify-content-between  mt-5 ms-5">
          <div>

          <h1  style={{ fontFamily: 'Roboto Mono', color:"rgb(167, 37, 56)"}} className="text-start">Flashcards Sets</h1>
          </div>


        </div>

        <div className="row">
          <div className="col">
        <hr style={{ color:"rgb(167, 37, 56)"}} className="border-2 mx-4" />
            
          </div>
          <div className="col-2 ">
          {/* <div class="ball"></div>
          <div class="shadow"></div> */}
                    <button
            id="add-subject-button"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +
          </button>
          </div>
        </div>

        
        <div className="d-flex mt-5  flex-wrap">
          {subjectArray}
        </div>
      </div>



      {showSubjectList ? (
        <Subjectlist
          onClickSubjectName={(e) => handleSubjectNameClick(e)}
          questionJSON={questionJSON}
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
          questionJSON={questionJSON}

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
