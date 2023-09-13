import React, { useState } from "react";
import DataContext from "../context/DataContext";
import Subjectview from "../components/Subjectview";
import Subjectflash from "../components/Subjectflash";
import QuestionStore from "../components/QuestionStore";

const Subject = () => {
  const [showSubjectView, setShowSubjectView] = useState(true);
  const [showSubjectFlash, setShowSubjectFlash] = useState(false);
  const [showQuestionStore, setShowQuestionStore] = useState(false);

  const [questionJSON, setQuestionJSON] = useState({
    question: "",
    answer: "",
  });

  const handleQuestionClick = (e) => {
    setQuestionJSON(e);
    setShowSubjectView(!showSubjectView);
    setShowQuestionStore(!showQuestionStore);
    console.log(e);
  };

  const handleStartClick = () => {
    setShowSubjectView(!showSubjectView);
    setShowSubjectFlash(!showSubjectFlash);
  };

  return (
    <>
      {showSubjectView ? (
        <Subjectview
          onQuestionClick={handleQuestionClick}
          onStartClick={handleStartClick}
        />
      ) : null}
      {showSubjectFlash ? (
        <Subjectflash onHomeClick={handleStartClick} />
      ) : null}
      {showQuestionStore ? (
        <QuestionStore
          questionJSON={questionJSON}
          onDoneClick={handleQuestionClick}
        />
      ) : null}
      {/* <Subjectflash></Subjectflash> */}
    </>
  );
};

export default Subject;
