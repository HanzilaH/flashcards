import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import DataContext from "../DataContext";

const Home = () => {
  const { data, pushData } = useContext(DataContext);
  const maxHeight = 250;

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

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

  const questionContent = (
    <>
      <h1 className="mb-3">Question</h1>
      <div>
        <input
          name="question"
          value={formData.question}
          onChange={handleInputChange}
          type="text"
        />
        <button onClick={() => toggleCard()}>Answer</button>
      </div>
    </>
  );

  const answerContent = (
    <>
      <h1 className="mb-3">Answer</h1>
      <div className="input-group w-75">
        <textarea
          name="answer"
          value={formData.answer}
          onChange={handleInputChange}
          class="form-control"
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

  const nextQuestion = () => {
    if (formData.answer === "" || formData.question === "") {
      console.log("NO APPROPRIATE DATA");
      return;
    }
    pushData(formData);
    setFormData({
      question: "",
      answer: "",
    });
    setIsAnswer(false);
    console.log(data);

    // Add your logic for handling the next question here
  };

  //   const history = useHistory();

  //   const handleButtonClick = () => {
  //     // Navigate to the desired route
  //     history.push("/flash"); // Replace '/about' with the route you want to navigate to
  //   };

  return (
    <>
      <Navbar></Navbar>

      <div id="home-section">
        <div
          className={`card w-75 h-75 mb-3 d-flex justify-content-center align-items-center `}
        >
          {isAnswer ? answerContent : questionContent}
        </div>

        <div className="row w-75">
          <div className="d-flex justify-content-end ">
            {/* Start */}
            <Link to="/flash" replace>
              <button className="me-3">Start</button>
            </Link>
            <button onClick={nextQuestion}>Next question</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
