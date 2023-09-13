import React from "react";
import Navbar from "../Navbar.jsx";

import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";
import { useEffect, useState } from "react";
import "../../styles/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        console.log(userCredential);
      }).catch((err)=>console.log(err))

  }

  const handleGoogle = async (e) => {
    const provider = await new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((re)=>{
    //     console.log(re);

    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })

    return signInWithPopup(auth, provider);
  };

  return (
    <>
      {/* <div style={{height:'75vh'}} classNameName=' d-flex justify-content-center align-items-center'>
        <button onClick={handleGoogle}>
            Sign In with Google
        </button>

    </div> */}

      <div className="w-100 d-flex justify-content-center">
        <form onSubmit={signIn} className="form ">
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

          <div className="row mb-3">
            <label className="sign-in-label" htmlFor="email">
              Email
            </label>
            <input
              className="sign-in-input"
              name="email"
              type="email"
              placeholder="Email"
              id="sign-in-email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="row mb-5">
            <label className="sign-in-label" htmlFor="password">
              Password
            </label>
            <input
              className="sign-in-input"
              name="user_password"
              type="password"
              placeholder="Password"
              id="sign-in-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>


          <div className="container ">
              <div className="row  justify-content-center">
                <div className="col-auto">
                  <button type="submit" className="sign-in-button">Login</button>
                  <button className="sign-in-button">Sign up</button>

                </div>
              </div>
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
                <p className="sign-in-label ">Sign in with</p>
              </div>

              <div className="col">
                <hr />
              </div>
            </div>

        </form>
      </div>
    </>
  );
};

export default SignIn;
