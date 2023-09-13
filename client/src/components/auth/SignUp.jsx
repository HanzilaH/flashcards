import React from "react";
import "../../styles/SignUp.css";

const SignUp = () => {
  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <form>
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
                placeholder="Username"
                id="sign-up-username"
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
                placeholder="Username"
                id="sign-up-email"
              />
            </div>
            <div className="flex-column d-flex mb-5">
              <label className="sign-up-label" htmlFor="password">
                Password
              </label>
              <input
                className="sign-up-input"
                name="user_password"
                type="password"
                placeholder="Password"
                id="sign-up-password"
              />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <button className="sign-up-button">Sign up</button>
                  <button className="sign-up-button">Login</button>
                </div>
              </div>
            </div>

            <div className="row w-100 separator">
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
                <p className="sign-in-label ">Sign in with</p>
              </div>

              <div className="col">
                <hr />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
