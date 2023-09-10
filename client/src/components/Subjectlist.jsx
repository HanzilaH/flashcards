import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataContext from "../DataContext";
import "../styles/Subjectlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Subjectlist = ({ onClickSubjectName }) => {
  const { data, addSubjectEntry } = useContext(DataContext);
  const [modalInputValue, setModalInputValue] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);

  useEffect(() => {
    const transformedData = data.map((element) => (
      //   <li
      //     key={element.id}
      //     onClick={() => onClickSubjectName(element.subject)}
      //     className="list-group-item"
      //   >
      //     {element.subject}
      //   </li>
      <div class="d-flex">
        <div class=" flex-grow-1">
          <div
            key={element.id}
            onClick={() => onClickSubjectName(element.subject)}
            className="list-group-item bg-transparent border-0"
          >
            {element.subject}
          </div>
        </div>

        <div class="p-2 bg-transparent">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    ));

    setSubjectArray(transformedData);
  }, [data, onClickSubjectName]);

  const handleSaveChangesClick = () => {
    console.log("Save changes clicked");
    console.log("Modal input value:", modalInputValue);
    addSubjectEntry(modalInputValue);
    setModalInputValue("");
  };

  return (
    <>
      <Navbar />
      <div id="subject-list-section" className="mt-3">
        <div>
          <h1>Subjects</h1>
          <ul id="subject-list" className="list-group list-group-flush">
            {subjectArray}
          </ul>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Subject
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New Subject Name
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  name="modal-name"
                  id=""
                  value={modalInputValue}
                  onChange={(e) => setModalInputValue(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChangesClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjectlist;
