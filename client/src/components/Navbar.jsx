import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-md container-sm">
          <div className="navbar-brand">BookTok</div>

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
                  Books
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
                  Scroll
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
                  Choose
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link active mx-3" aria-current="page">
                  Login
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
