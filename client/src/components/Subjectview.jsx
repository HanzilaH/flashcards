import React from "react";
import "../styles/Subjectview.css";
import DataContext from "../context/DataContext";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Subjectview = (props) => {
  const { onQuestionClick, onStartClick, onBackClick } = props;
  const { data, removeQuestion, currentSubject, findQuestionArray } =
    useContext(DataContext);

  const [questionArray, setQuestionArray] = useState([]);
  const navigate = useNavigate();

  const [removeElementRef, setRemoveElementRef] = useState({});
  // const [questionArray, setQuestionArray] = useState([]);
  const handleRemoveElement = (element) => {
    // const updatedRemoveElementRef = { ...removeElementRef };
    // updatedRemoveElementRef[element.id] = true;

    // // Set the updated object
    // setRemoveElementRef(updatedRemoveElementRef);
    // console.log(removeElementRef);

    // // Remove the question after the animation duration
    // setTimeout(() => {
    removeQuestion(currentSubject, element.question);

    //   // Reset the removing state
    //   updatedRemoveElementRef[element.id] = false;
    //   setRemoveElementRef(updatedRemoveElementRef);
    // }, 10);
  };

  const [showQuestionLabel, setShowQuestionLabel] = useState(true);

  useEffect(() => {
    const arr = findQuestionArray();
    if (arr.length === 0) {
      setShowQuestionLabel(false);
      setQuestionArray(
        <div className="d-flex px-3 justify-content-center align-items-center ">
          Click add button to add more Questions <hr />
        </div>
      );
    } else {
      setShowQuestionLabel(true);
      const transformedData = arr.map((element) => {
        const elementID = element.id;

        console.log(element);

        return (
          <>
            <div
              key={element.id}
              className="d-flex me-2 ms-3 mt-2 mb-3 question-list-item "
            >
              <div
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

              <div className=" p-2 bg-transparent d-flex align-items-center justify-content-center">
                <div
                  onClick={() => handleRemoveElement(element.question)}
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
  }, [currentSubject]);

  return (
    <>
      <div className="subject-view-section">
        <div
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          className="d-flex align-items-center mb-3"
        >
          <div className="ms-3 me-auto p-2 w-75">
            <h1>{currentSubject}</h1>
          </div>

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

        <div className="d-flex justify-content-center">
          <div className=" w-75 question-list-card">
            <div id="question-label">
              {" "}
              {showQuestionLabel ? "Questions:" : null}
            </div>
            <div>{questionArray}</div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-end">
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
