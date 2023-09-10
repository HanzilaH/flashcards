import React from "react";
import Navbar from "./Navbar";
import "../styles/Subjectview.css";
import DataContext from "../DataContext";
import { useContext, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Subjectview = (props) => {
  const { onQuestionClick } = props;
  const { data, removeQuestion, currentSubject, findQuestionArray } =
    useContext(DataContext);

  const [questionArray, setQuestionArray] = useState([]);

  useEffect(() => {
    const transformedData = findQuestionArray(currentSubject).map((element) => (
      //   <li
      //     key={element.id}
      //     onClick={() => onClickSubjectName(element.subject)}
      //     className="list-group-item"
      //   >
      //     {element.subject}
      //   </li>
      <div className="d-flex m-2">
        <div className=" flex-grow-1">
          <div
            onClick={() => onQuestionClick(element)}
            key={element.id}
            className="list-group-item question bg-transparent border-0"
          >
            {element.question}
          </div>
        </div>

        <div className="p-2 bg-transparent d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    ));

    setQuestionArray(transformedData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="subject-view-section">
        <div className="row">
          <h1>{currentSubject}</h1>
        </div>

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
            <button className="subject-view-button">
              <span>Start</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="card w-75">
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
