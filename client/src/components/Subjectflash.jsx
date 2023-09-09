import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataContext from "../DataContext";
import { useContext } from "react";

const Subjectflash = () => {
  const [flashCard, setFlashCard] = useState(null);
  const { data } = useContext(DataContext);
  const [question, setQuestion] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      // Handle the case when the data array is empty
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedCard = data[randomIndex];

    setFlashCard(selectedCard); // Update the state with the selected card
  }, [data]);

  const flipCard = () => {
    setQuestion(!question);
  };

  const nextQuestion = () => {
    setQuestion(true);
    if (data.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedCard = data[randomIndex];

    setFlashCard(selectedCard);
  };

  return (
    <>
      <Navbar />

      <div id="home-section">
        <div
          className={`card w-75 h-75 mb-3 d-flex justify-content-center align-items-center `}
        >
          {flashCard && (question ? flashCard.question : flashCard.answer)}
        </div>

        <div className="row w-75">
          <div className="d-flex justify-content-end ">
            <button className="me-3" onClick={flipCard}>
              Flip
            </button>
            <button onClick={nextQuestion}>Next question</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjectflash;
