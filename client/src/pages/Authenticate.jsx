import React, { useEffect } from "react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { useState, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";
import { collection, doc } from "firebase/firestore";
import DataContext from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  // this is just a boolean to swap b/w sign in or sign up
  const [showSignInPage, setShowSignInPage] = useState(true);

  const { login, logout, signUp, currentUser } = useAuth();
  const navigate = useNavigate();

  const navigateToHome = () => {
    // for now the current page is not replaced so i can come back for testing
    navigate("/home");
  };

  // DEALT WITH THIS STUFF IN THE AUTHCONTEXT.JS
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user);

  //       try {
  //         // const subjectsCollectionRef = collection(db, 'users', doc(db, 'users', user.uid), 'subjects');
  //         console.log(db);
  //       } catch (error) {
  //         console.error("Error creating Firestore reference:", error);
  //       }
  //     } else {
  //       setAuthUser(null);
  //     }
  //   });

  //   return () => {
  //     listen();
  //   };
  // }, []);

  const togglePage = () => {
    setShowSignInPage(!showSignInPage);
  };
  return (
    <>
      <div>
        {/* just two informative messages */}
        <div className="text-center m-3">
          {currentUser ? "data is there" : "data is not there"}
        </div>

        <div className="text-center m-4">
          {currentUser ? `Signed In ${currentUser.email}` : "Signed out"}
        </div>

        {showSignInPage ? (
          <SignIn
            onSignUpButtonClick={togglePage}
            onSignInButtonClick={navigateToHome}
          />
        ) : (
          <SignUp
            onSignInButtonClick={togglePage}
            onSignUpButtonClick={navigateToHome}
          />
        )}

        {currentUser ? (
          <div className="d-flex justify-content-center m-3">
            <button onClick={logout}>Sign Out</button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Authenticate;
