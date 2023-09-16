import React from "react";
import "../../styles/SignUp.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";

import { createUser } from "../../context/DbFunctions";

const SignUp = ({ onSignInButtonClick, onSignUpButtonClick }) => {
  // const {createUser} = useContext(DataContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [warningTextValue, setWarningTextValue] = useState("");

  const { login, logout, signup, currentUser } = useAuth();

  const signUpUser = (e) => {
    e.preventDefault();

    if (userName === "") {
      setWarningTextValue("No username entered");
      return;
    } else if (email === "") {
      setWarningTextValue("No email entered");
      return;
    } else if (password === "") {
      setWarningTextValue("No password entered");
    }

    // ADD SOME INPUT VALIDATION

    if (currentUser) {
      setWarningTextValue("Another user is signed in");
      return;
    }

    signup(email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);

        // To create a user entry in the "users" collection
        createUser(userCredential.user.uid, userName, email);

        // if all goes well then navigate to /home using this function
        onSignUpButtonClick();
      })
      .catch((err) => {
        // console.log(err)
        // PROCESS THE RETURNED RESULT HERE EG SAME EMAIL
      });

    setEmail("");
    setPassword("");
    setUserName("");
  };

  // Need to reset the warning if user types any word
  useEffect(() => {
    setWarningTextValue("");
  }, [email, password, userName]);

  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <form onSubmit={signUpUser}>
          <div className="form ">
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
              <h1 className="form_heading">Sign up</h1>
            </div>

            <div className="flex-column d-flex w-20 mb-3">
              <label className="sign-up-label" htmlFor="username">
                Username
              </label>
              <input
                className="sign-up-input"
                name="username"
                type="text"
                // placeholder="Username"
                id="sign-up-username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="flex-column d-flex w-20 mb-3">
              <label className="sign-up-label" htmlFor="email">
                Email
              </label>
              <input
                className="sign-up-input"
                name="email"
                type="text"
                // placeholder="Email address"
                id="sign-up-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-column d-flex mb-3">
              <label className="sign-up-label" htmlFor="password">
                Password
              </label>
              <input
                className="sign-up-input"
                name="user_password"
                type="password"
                // placeholder="Password"
                id="sign-up-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center mb-3 sign-up-warning-text">
              {warningTextValue}
            </div>

            <div className="w-100 d-flex justify-content-center">
              <button type="submit" className="sign-up-button">
                Sign up
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
                <p className="sign-in-label ">or Sign up with</p>
              </div>

              <div className="col">
                <hr />
              </div>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => alert("Feature not implement yet")}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </div>

            {/* <hr /> */}
            <div className="text-center p-0 m-0 w-100">
              <hr />
              <div className="sign-in-label">
                Already have account?
                <a
                  style={{ cursor: "pointer" }}
                  onClick={onSignInButtonClick}
                  className="sign-in-label pointer"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
