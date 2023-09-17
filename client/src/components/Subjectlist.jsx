import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import "../styles/Subjectlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { addSubjectToUser, getSubjectsArray } from "../context/DbFunctions";
import { useAuth } from "../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";

const Subjectlist = ({ onClickSubjectName }) => {
  const { currentUser } = useAuth();

  const { data, addSubjectEntry, removeEntryBySubject } =
    useContext(DataContext);

  const [modalInputValue, setModalInputValue] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);

  const [errorValue, setErrorValue] = useState(null);

  const generateUniqueTimeBasedId = () => {
    const unixTimestamp = Date.now();
    const uniqueIdentifier = Math.floor(Math.random() * 1000000);

    const uniqueId = `${unixTimestamp}-${uniqueIdentifier}`;

    return uniqueId;
  };

  useEffect(() => {
    const transformedData = data.map((element) => {
      return (
        <>
          <div
            key={element.id}
            className="d-flex me-2 ms-3 mt-2 mb-3 subject-list-item"
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflow: "auto",
              }}
              onClick={() => onClickSubjectName(element.subject)}
              className="p-2 subject flex-grow-1"
            >
              {element.subject}
            </div>

            <div className=" p-2 bg-transparent d-flex align-items-center justify-content-center">
              <div
                onClick={() => removeEntryBySubject(element.subject)}
                className="trash-bin"
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        </>
      );
    });
    setSubjectArray(transformedData);
  }, [data, onClickSubjectName]);

  useEffect(() => {
    setErrorValue(null);
  }, [modalInputValue]);

  const handleSaveChangesClick = () => {
    console.log("Save changes clicked");
    console.log("Modal input value:", modalInputValue);
    if (modalInputValue === "") {
      setErrorValue("Incorrect Subject Name!");
      setTimeout(() => {
        setErrorValue(null);
      }, 2000);
      return;
    }

    addSubjectEntry(modalInputValue);

    // for storing to the firestore
    if (currentUser) {
      // not using the unique id for each subject for now but will implement in the future
      const uniqueId = generateUniqueTimeBasedId();

      addSubjectToUser(currentUser.uid, [
        { subject: modalInputValue, questions: [] },
      ]);

      const subjectsArray = getSubjectsArray(currentUser.uid);
      console.log("subject array from promise", subjectsArray);
    }
    const closeModalElement = document.querySelector(
      "[data-bs-dismiss='modal']"
    );
    if (closeModalElement) {
      closeModalElement.click();
    }

    setModalInputValue("");
  };

  return (
    <>
      <div className="subject-list-section">
        <div className="text-center m-3">
          <h1>Subjects</h1>
        </div>

        <div className="d-flex justify-content-center">
          <div className="w-50 subject-list-card">
            <div>
              {subjectArray.length === 0 ? (
                <div className="m-2">Add subjects to start</div>
              ) : (
                subjectArray
              )}
            </div>
          </div>
        </div>

        <div className=" w-75 d-flex justify-content-end">
          <button
            id="add-subject-button"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Subject
          </button>
        </div>

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
                <textarea
                  className="subject-list-input"
                  name="modal-name"
                  id=""
                  value={modalInputValue}
                  onChange={(e) => setModalInputValue(e.target.value)}
                />

                <div className="text-center subject-list-error">
                  {errorValue ? errorValue : null}
                </div>
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
                  Save
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
