import React, { useEffect, useState } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ flipped, flashcardJson }) => {
  // const {flashcardJson} = props
  const [isFlipped, setIsFlipped] = useState(false);
  const [yFlip, setYFlip] = useState(false);
  const [localFlashcardJson, setLocalFlashCardJson] = useState({
    question: "qs",
    answer: "ans",
  });

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    toggleCard();
  }, [flipped]);

  useEffect(() => {
    setLocalFlashCardJson(flashcardJson);

    setYFlip(true);
    setIsFlipped(false);
    // setYFlip(false);
    setTimeout(() => {
      setYFlip(false);
    }, 550);
  }, [flashcardJson]);
  return (
    <>
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""} ${
          yFlip ? " y-axis-flip" : ""
        }`}
        onClick={toggleCard}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflow: "auto",
              }}
              className="content-container"
            >
              {localFlashcardJson ? localFlashcardJson.question : null}
            </div>
          </div>
          <div className="flip-card-back">
            {localFlashcardJson ? localFlashcardJson.answer : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcard;
