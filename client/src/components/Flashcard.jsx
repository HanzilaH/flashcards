import { useState } from "react";
import React from "react";

const Flashcard = () => {
  const [isAnswer, setIsAnswer] = useState(false);
  const toggleCard = () => {
    setIsAnswer(!isAnswer);
  };

  const questionContent = (
    <>
      <h1 className="mb-3">Question</h1>
      <div>
        <input type="text" />
        <button onClick={() => toggleCard()}>Answer</button>
      </div>
    </>
  );

  const answerContent = (
    <>
      <h1 className="mb-3">Answer</h1>
      <div>
        <input type="text" />
        <button onClick={() => toggleCard()}>Question</button>
      </div>
    </>
  );

  return (
    <>
      <div
        className={`card  w-75 h-75 mb-3 d-flex justify-content-center align-items-center `}
      >
        {isAnswer ? answerContent : questionContent}
      </div>
    </>
  );
};

export default Flashcard;
