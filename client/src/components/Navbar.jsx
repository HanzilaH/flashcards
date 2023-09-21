import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ onHomeButtonClick }) => {
  // currentUser for the login/logout states
  // the logout function from AuthContext handles the logout procedure
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate(); // Get the navigate function

  const handleLoginClickForNavBar = () => {
    // the replace property stops the user from coming back

    navigate("/", { replace: true });
  };

  const handleLogoutClickForNavBar = () => {
    logout();

    // each user should go to authentication page after logging out
    navigate("/", { replace: true });
  };

  const handleHomeClick = () => {
    // if (currentUser) {
      // onHomeButtonClick();
    // }
    navigate("/home");

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-md container-sm">
          <div className="">
            <img
              style={{ height: "1.3rem" }}
              src="logo.png"
              alt="Logo"
              className="navbar-logo"
            />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto ">
              <div className="my-2 mx-3" aria-current="page">
                <div className=" flashcard-nav-link " onClick={handleHomeClick}>
                  Home
                </div>
              </div>

              <Link
              to="/planner"
                // onClick={() => alert("Feature not implemented yet")}
                className="my-2 flashcard-nav-link mx-3"
                aria-current="page"
              >

                Planner
              </Link>
              <div className="my-2  mx-3" aria-current="page">
                {currentUser ? (
                  <button
                    className="navbar-button"
                    onClick={handleLogoutClickForNavBar}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="navbar-button"
                    onClick={handleLoginClickForNavBar}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
