import React, { useState, useContext, useRef } from "react";
import Navbar from "./Navbar";
import DataContext from "../DataContext";
import "../styles/QuestionStore.css";

const QuestionStore = (props) => {
  const { onDoneClick, questionJSON } = props;

  const questionTextArea = useRef(null);
  const answerTextArea = useRef(null);

  const { data, pushData, currentSubject, removeQuestion, updateQuestionJson } =
    useContext(DataContext);
  const maxHeight = 250;

  const [initialFormData, setInitialFormData] = useState(questionJSON);
  const [formData, setFormData] = useState(questionJSON);

  const [isAnswer, setIsAnswer] = useState(false);

  const toggleCard = () => {
    setIsAnswer(!isAnswer);
  };

  const handleInputChange = (e) => {
    const element = e.target;

    // Set a maximum height
    if (element.scrollHeight > maxHeight) {
      element.style.height = `${maxHeight}px`;
    } else {
      element.style.minHeight = "15px";
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const doneFunction = () => {
    console.log(formData);
    if (formData.answer === "" || formData.question === "") {
      console.log("NO APPROPRIATE DATA");
      return;
    }

    if (initialFormData.question === "" && initialFormData.answer === "") {
      pushData(formData);
    } else {
      updateQuestionJson(currentSubject, initialFormData, formData);
    }
  };

  const nextQuestion = () => {
    console.log(formData);
    if (formData.answer === "" || formData.question === "") {
      console.log("NO APPROPRIATE DATA");
      return;
    }

    doneFunction();

    setFormData({
      question: "",
      answer: "",
    });
    setInitialFormData({ question: "", answer: "" });
    setIsAnswer(false);
    console.log(data);
  };

  const questionContent = (
    <>
      <h1 className="mb-3">Question</h1>
      <div className="input-group w-75 ">
        <textarea
          ref={questionTextArea}
          name="question"
          value={formData.question}
          onChange={handleInputChange}
          className=" question-store-textarea"
          aria-label="With textarea"
        ></textarea>
      </div>

      <div className="row w-75">
        <div className="d-flex justify-content-end mt-3">
          <button onClick={() => toggleCard()}>Answer</button>
        </div>
      </div>
    </>
  );

  const answerContent = (
    <>
      <h1 className="mb-3">Answer</h1>
      <div className="input-group w-75 ">
        <textarea
          ref={answerTextArea}
          name="answer"
          rows={4}
          value={formData.answer}
          onChange={handleInputChange}
          className=" question-store-textarea"
          aria-label="With textarea"
        ></textarea>
      </div>

      <div className="row w-75">
        <div className="d-flex justify-content-end mt-3">
          <button onClick={() => toggleCard()}>Question</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar></Navbar>

      <div id="home-section">
        <div
          id="question-store-card"
          className={`card w-75 w-md-100 h-75 mb-3 d-flex justify-content-center align-items-center `}
        >
          {isAnswer ? answerContent : questionContent}
        </div>

        <div className="row w-75">
          <div className="d-flex justify-content-end ">
            {/* Start */}

            <button
              onClick={() => {
                doneFunction();
                onDoneClick(formData);
              }}
              className="me-3"
            >
              Done
            </button>
            <button onClick={nextQuestion}>New question</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionStore;
