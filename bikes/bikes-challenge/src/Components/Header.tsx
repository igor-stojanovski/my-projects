import { useState } from "react";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg bg-body-white ">
      <div className="container-fluid border-bottom">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand d-flex justify-content-center" href="#">
          <img src="/img/logo.png" alt="Logo" className="w-25" />
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold text-uppercase">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Bikes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Gear
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Parts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tires
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Service-info
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Catalogue
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {isSearchOpen ? (
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            ) : null}
            <button
              className="bg-transparent border-0"
              onClick={() => {
                setIsSearchOpen((prevState) => !prevState);
              }}
            >
              <i className="fa-solid  fa-magnifying-glass"></i>
            </button>
            <button className="bg-transparent border-0">
              <i className="fa-solid fa-bag-shopping"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
