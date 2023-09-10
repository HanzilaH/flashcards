import React, { useState } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ flipped, flashcardJson }) => {
  // const {flashcardJson} = props
  const [isFlipped, setIsFlipped] = useState(flipped);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={toggleCard}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="content-container">
              {flashcardJson.question}
              lkas; lkj a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj ;laskdfj
              ;laskfjlkas; lkj a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj ;laskdfj
              ;laskfj ;alskdflkas; lkj a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj
              ;laskdfj ;laskfj ;alskdflkas; lkj a;sldkf j;lk j;lk j;lk
              j;laskdjf;lsakdfj ;laskdfj ;laskfj ;alskdflkas; lkj a;sldkf j;lk
              j;lk j;lk j;laskdjf;lsakdfj ;laskdfj ;laskfj ;alskdflkas; lkj
              a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj ;laskdfj ;laskfj
              ;alskdflkas; lkj a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj ;laskdfj
              ;laskfj ;alskdflkas; lkj a;sldkf j;lk j;lk j;lk j;laskdjf;lsakdfj
              ;laskdfj ;laskfj ;alskdflkas; lkj a;sldkf j;lk j;lk j;lk
              j;laskdjf;lsakdfj ;laskdfj ;laskfj ;alskdf ;alskdf
            </div>
          </div>
          <div className="flip-card-back">
            {flashcardJson.answer}
            laskd;fklsaj ;dflksaj d;flksaj df;lksadjf lsakdf ;asldkf
            jas;ldkfjas;ldkfj sa;ldfkja sl;dkfjg
          </div>
        </div>
      </div>
      <button onClick={() => toggleCard()}>button</button>
    </>
  );
};

export default Flashcard;
