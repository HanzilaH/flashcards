import React from "react";
import "../styles/Subjectview.css";
import DataContext from "../context/DataContext";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Subjectview = (props) => {
  const { onQuestionClick, onStartClick } = props;
  const { data, removeQuestion, currentSubject, findQuestionArray } =
    useContext(DataContext);

  const [questionArray, setQuestionArray] = useState([]);
  const navigate = useNavigate();

  const [removeElementRef, setRemoveElementRef] = useState({});
  // const [questionArray, setQuestionArray] = useState([]);
  // Create a function to handle element removal
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

  useEffect(() => {
    if (currentSubject === null) {
      setQuestionArray(<>No Questions U dummy</>);
    } else {
      const transformedData = findQuestionArray().map((element) => {
        const elementID = element.id;

        console.log(element);

        // Create a new object with the updated property
        // const updatedRemoveElementRef = { ...removeElementRef };
        // updatedRemoveElementRef[elementID] = false;

        return (
          <div key={element.id} className={`d-flex m-2 question-list-item `}>
            <div className="flex-grow-1">
              <div
                onClick={() => onQuestionClick(element)}
                className="list-group-item question  bg-transparent border-0"
              >
                {element.question}
              </div>
            </div>

            <div className="p-2 bg-transparent d-flex align-items-center justify-content-center">
              <div
                onClick={() => handleRemoveElement(element)}
                className="trash-bin"
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        );
      });

      setQuestionArray(transformedData);
    }
  }, [data]);

  return (
    <>
      <div className="subject-view-section">
        <div
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          className="d-flex align-items-center"
        >
          <div className="p-2 w-75">
            <h1>{currentSubject}</h1>
          </div>
          <div className="p-2 flex-shrink-1 d-flex align-items-center flex-column flex-md-row justify-content-center">
            {/* <button className="subject-view-button">Add</button>
            <button className="subject-view-button">Start</button> */}
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
          <div className="card w-75 question-list-card">
            <div id="question-label">Questions:</div>
            <ul id="question-list" className="m-2 list-group ">
              {questionArray}
            </ul>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-end">
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="subject-view-button"
          >
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
