import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

const Navbar = () => {
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

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-md container-sm">
          <div className="navbar-brand">Flashcard.io</div>

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
            <ul className="navbar-nav ms-auto mb-2">
              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
                  Home
                </div>
              </li>

              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
                  Planner
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
