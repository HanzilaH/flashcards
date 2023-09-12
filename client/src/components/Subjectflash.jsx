import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataContext from "../DataContext";
import { useContext } from "react";
import "../styles/Subjectflash.css";
import Flashcard from "./Flashcard";

const Subjectflash = () => {
  const [flashCard, setFlashCard] = useState(null);
  const { data, currentSubject, setCurrentSubject } = useContext(DataContext);

  const [questions, setQuestions] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);

  useEffect(() => {
    // Find the subject object with the matching name
    const subjectObject = data.find(
      (element) => element.subject === currentSubject
    );

    // Extract the questions array of the current subject
    const currentSubjectQuestions = subjectObject
      ? subjectObject.questions
      : [];

    setQuestions(currentSubjectQuestions);
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      // Handle the case when the questions array is empty
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedCard = questions[randomIndex];

    setFlashCard(selectedCard); // Update the state with the selected card
  }, [questions]);

  const flipCard = () => {
    setShowQuestion(!showQuestion);
  };

  const nextQuestion = () => {
    setShowQuestion(true);
    if (questions.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedCard = questions[randomIndex];

    setFlashCard(selectedCard);
  };

  return (
    <>
      <Navbar />

      <div id="home-section">
        <div
          className={` w-75 h-75 mb-3 d-flex justify-content-center align-items-center flex-column `}
        >
          <div className="subject-flash-label">
            {flashCard && (showQuestion ? "Question" : "Answer")}
          </div>

          <Flashcard
            flipped={showQuestion}
            flashcardJson={flashCard}
          ></Flashcard>
        </div>

        <div className="row w-75 ">
          <div className="d-flex justify-content-center ">
            <button
              onClick={() => setCurrentSubject(null)}
              className="subject-flash-button me-3"
            >
              Home
            </button>

            <button className="subject-flash-button me-3" onClick={flipCard}>
              Flip
            </button>
            <button className="subject-flash-button" onClick={nextQuestion}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjectflash;
