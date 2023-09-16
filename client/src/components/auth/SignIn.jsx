import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useEffect, useState } from "react";
import "../../styles/SignIn.css";
import { useAuth } from "../../context/AuthContext.js";

const SignIn = ({ onSignUpButtonClick, onSignInButtonClick }) => {
  // for email and password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [warningTextValue, setWarningTextValue] = useState("");

  const { login, logout, currentUser } = useAuth();

  const signInUser = (e) => {
    e.preventDefault();

    if (email === "") {
      setWarningTextValue("No email entered");
      return;
    } else if (password === "") {
      setWarningTextValue("No password entered");
      return;
    }

    // so that the form becomes blank again
    setEmail("");
    setPassword("");

    // ADD SOME INPUT VALIDATION

    if (currentUser) {
      setWarningTextValue("You are already signed in");
      return;
    }

    login(email, password)
      .then((userCredential) => {
        // console.log(userCredential);
      })
      .catch((err) => {
        // console.log(err);
        // PROCESS THE RETURNED RESULT HERE EG WRONG PASSWORD
      });

    // if all goes well then navigate to /home using this function
    onSignInButtonClick();
  };

  // Need to reset the warning if user types any word
  useEffect(() => {
    setWarningTextValue("");
  }, [email, password]);

  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <form onSubmit={signInUser} className="form ">
          <div className="card_header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
              ></path>
            </svg>
            <h1 className="form_heading">Sign in</h1>
          </div>

          <div className="row w-75 mb-3">
            <label className="sign-in-label" htmlFor="email">
              Email
            </label>
            <input
              className="sign-in-input"
              name="email"
              type="email"
              placeholder="Email"
              id="sign-in-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row w-75 mb-2">
            <label className="sign-in-label" htmlFor="password">
              Password
            </label>
            <input
              className="sign-in-input"
              name="user_password"
              type="password"
              placeholder="Password"
              id="sign-in-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center m-3 sign-in-warning-text">
            {warningTextValue}
          </div>

          <div className="w-75 d-flex  justify-content-end">
            {/* this button changes the page to Sign Up component */}

            <button type="submit" className="sign-in-button">
              Login
            </button>
          </div>

          <div className="row mt-4 w-100 separator">
            <div className="col">
              <hr />
            </div>
            <div
              style={{
                overflow: "auto",
                // whiteSpace: 'nowrap',
              }}
              className="col text-center "
            >
              <p className="sign-in-label ">or sign in with</p>
            </div>

            <div className="col">
              <hr />
            </div>
          </div>

          <div>
            <FontAwesomeIcon icon={faGoogle} />
          </div>

          {/* <hr /> */}
          <div className="text-center w-100">
            <hr />
            <div className="sign-in-label">
              No account?
              <a
                style={{ cursor: "pointer" }}
                onClick={onSignUpButtonClick}
                className="sign-in-label"
              >
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
