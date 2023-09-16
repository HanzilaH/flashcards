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
    // Get the current Unix timestamp (in milliseconds)
    const unixTimestamp = Date.now();

    // Generate a random number or unique identifier
    // You can use a library like `uuid` for generating unique identifiers
    // For simplicity, we'll generate a random number here
    const uniqueIdentifier = Math.floor(Math.random() * 1000000); // Change as needed

    // Concatenate the timestamp and unique identifier to create the unique ID
    const uniqueId = `${unixTimestamp}-${uniqueIdentifier}`;

    return uniqueId;
  };

  useEffect(() => {
    const transformedData = data.map((element) => {
      return (
        <div key={element.id} className="d-flex subject-list-item m-3">
          {/* <div
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
            className="subject w-100"
          > */}
          <div
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
            onClick={() => onClickSubjectName(element.subject)}
            className=" w-100 bg-transparent m-0 p-2"
          >
            {element.subject}
          </div>
          {/* </div> */}

          <div className="p-2 bg-transparent flex-shrink-1 d-flex align-items-center justify-content-center">
            <div
              onClick={() => removeEntryBySubject(element.subject)}
              className="subject-trash-bin"
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
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
      <div id="subject-list-section" className="mt-3">
        <div>
          <h1>Subjects</h1>
          <ul id="subject-list" className="list-group list-group-flush">
            {subjectArray.length === 0 ? (
              <div className="m-2">Add subjects to start</div>
            ) : (
              subjectArray
            )}
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
