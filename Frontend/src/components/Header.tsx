import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav flex flex-wrap items-center justify-between px-4">
      <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
        <span className="font-semibold text-xl tracking-tight">
          Content Management App
        </span>
      </div>

      <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        htmlFor="menu-btn"
      >
        <span className="navicon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        <li className="border-t md:border-none">
          <Link
            to="/"
            className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
          >
            Home
          </Link>
        </li>

        <li className="border-t md:border-none">
          <Link
            to="/dashboard"
            className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
