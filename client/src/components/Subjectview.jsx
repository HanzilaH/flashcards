import React from "react";
import Navbar from "./Navbar";
import "../styles/Subjectview.css";
import DataContext from "../DataContext";
import { useContext, useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Subjectview = (props) => {
  const { onQuestionClick, onStartClick } = props;
  const { data, removeQuestion, currentSubject, findQuestionArray } =
    useContext(DataContext);

  const [questionArray, setQuestionArray] = useState([]);

  // let removeElementRef = useRef(null);
  //
  // useEffect(() => {
  //   // Ensure that removeElementRef.current is not null before accessing it
  //   if (removeElementRef.current) {
  //     // Add the class to the DOM element
  //     removeElementRef.current.classList.add("remove-element-animation");
  //   }
  // }, [removeElementRef]);

  // const removeElementAnimation = (id) => {
  //   console.log(questionArray);
  //   questionArray.filter((element) => {
  //     console.log(element.props.id);
  //     if (element.props.id === id) {
  //       element.ref = removeElementRef;
  //       console.log(element);
  //     }
  //   });
  // };

  const [removeElementRef, setRemoveElementRef] = useState({});
  // const [questionArray, setQuestionArray] = useState([]);
  // Create a function to handle element removal
  const handleRemoveElement = (element) => {
    const updatedRemoveElementRef = { ...removeElementRef };
    updatedRemoveElementRef[element.id] = true;

    // Set the updated object
    setRemoveElementRef(updatedRemoveElementRef);
    console.log(removeElementRef);

    // Remove the question after the animation duration
    setTimeout(() => {
      removeQuestion(currentSubject, element.question);

      // Reset the removing state
      updatedRemoveElementRef[element.id] = false;
      setRemoveElementRef(updatedRemoveElementRef);
    }, 10);
  };

  useEffect(() => {
    const transformedData = findQuestionArray(currentSubject).map((element) => {
      const elementID = element.id;

      // Create a new object with the updated property
      const updatedRemoveElementRef = { ...removeElementRef };
      updatedRemoveElementRef[elementID] = false;

      return (
        <div
          key={element.id}
          className={`d-flex m-2 question-list-item ${
            removeElementRef[element.id] ? "remove-element-animation" : ""
          }`}
        >
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
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="subject-view-section">
        <div className="d-flex align-items-center">
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
      </div>
    </>
  );
};

export default Subjectview;
