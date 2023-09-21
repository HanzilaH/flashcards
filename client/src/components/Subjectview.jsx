import React from "react";
import "../styles/Subjectview.css";
import DataContext from "../context/DataContext";
import { useContext, useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


// Views the summary for every each subject
// Includes the list of questions and the buttons
const Subjectview = (props) => {

  // the functions called on Click of each button is passed into this component as props 
  const { onQuestionClick, onStartClick, onBackClick } = props;

  // basic data manipulation functions from the DataContext
  const { data, removeQuestion, currentSubject, findQuestionArray } =
    useContext(DataContext);

  const [questionArray, setQuestionArray] = useState([]);

  // This state is used for the question label
  const [showQuestionLabel, setShowQuestionLabel] = useState(true);

  // const handleRemoveElement = (question) => {
  //   removeQuestion(currentSubject, question);
  // };


  useEffect(() => {
    const arr = findQuestionArray();


    // IF there are no questions then tell the user to add questions first
    if (arr.length === 0) {
      setShowQuestionLabel(false);
      setQuestionArray(
        <div className="d-flex px-3 justify-content-center align-items-center ">
          Click add button to add more Questions <hr />
        </div>
      );




    } else {

      setShowQuestionLabel(true);
      
      // Else map over the array elements and make a list item for each question
      const transformedData = arr.map((element, id) => {


        return (
          <>
            <div
              key={id}
              className="d-flex me-2 ms-3 mt-2 mb-3 question-list-item"
            >
              <div

              // these properties are imp for sending the long word to the next line
              // these properties dont word using class name
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  overflow: "auto",
                }}
                onClick={() => onQuestionClick(element)}
                className="p-2 question flex-grow-1"
              >
                {element.question}
              </div>


              {/* for the trashbin div */}
              <div className=" p-2 bg-transparent d-flex align-items-center justify-content-center">
                <div
                  onClick={() => removeQuestion(currentSubject, element.question)}
                  className="trash-bin"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
          </>
        );
      });

      setQuestionArray(transformedData);
    }

    // every time the data the changed the page is rerendered
  }, [data]);

  return (
    <>
      <div className="subject-view-section">



        <div
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          className="d-flex align-items-center mb-3"
        >


          {/* For the title div which usually occupy 75% of viewport width */}
          <div className="ms-3 me-auto p-2 w-75">
            <h1>{currentSubject}</h1>
          </div>

          {/* this div is for the Add and Start button and how they go from row to columns direction on smaller screens */}
          <div className="p-2 flex-shrink-1 d-flex align-items-center flex-column flex-md-row justify-content-center">
            <button
              onClick={() => onQuestionClick({ question: "", answer: "" })}
              className="subject-view-button"
            >
              <span>Add</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
            <button
              onClick={() => onStartClick()}
              className="subject-view-button"
            >
              <span>Start</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>



        </div>



        {/*For the card containing the questions  */}
        <div className="d-flex justify-content-center">
          <div className=" w-75 question-list-card">
            <div id="question-label">
              {/* This is to prevent the Questions label from showing when there are no questions */}
              {showQuestionLabel ? "Questions:" : null}
            </div>
            {/* The question divs are in an array manipulated by useEffect */}
            <div>{questionArray}</div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-end">

          {/* The Back button */}
          <button onClick={onBackClick} className="subject-view-button">
            <span>Back</span>
            <svg
              style={{ transform: "rotate(180deg)" }}
              viewBox="0 0 13 10"
              height="10px"
              width="15px"
            >
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>


        </div>
      </div>
    </>
  );
};

export default Subjectview;
