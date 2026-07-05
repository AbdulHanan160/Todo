import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.png";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="sticky top-0 z-50 flex justify-between items-center p-2 w-full bg-[#2D2D2D]">
        <div className="logo mx-2">
          <img className="h-10 invert" src={Logo} alt="Todo App Logo" />
        </div>
        <div className="mx-2">
          <ul className="flex gap-4">
            <li>
              <NavLink to="/home" end>
                {({ isActive }) => (
                  <span
                    className={`relative group px-1 py-1 transition-colors duration-300 ${
                      isActive ? "text-gray-300" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <span className="relative z-10">Home</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-gray-300 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                {({ isActive }) => (
                  <span
                    className={`relative group px-1 py-1 transition-colors duration-300 ${
                      isActive ? "text-gray-300" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <span className="relative z-10">About</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-gray-300 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-todos">
                {({ isActive }) => (
                  <span
                    className={`relative group px-1 py-1 transition-colors duration-300 ${
                      isActive ? "text-gray-300" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <span className="relative z-10">Saved Todos</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-gray-300 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
