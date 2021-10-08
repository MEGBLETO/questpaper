import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Login from "../components/Login";

const Nav = () => {
  return (
    <div className="bg-gray-500 p-4 flex justify-between text-white">
      <h1 className="flex-1 font-cookie text-3xl">QuestPaper</h1>

      <ul className="hidden sm:flex space-x-3 text-center items-center">
        <li className="hover: cursor-pointer hover:text-red-200">
          <Link to="/Home">Home</Link>
        </li>
        <li className="hover: cursor-pointer hover:text-red-200">A propos</li>
        <li className="hover: cursor-pointer hover:text-red-200">Nos Services</li>
        <li className="hover: cursor-pointer hover:text-red-200">Contact</li>

        <li className="flex hover: cursor-pointer hover:text-red-200">
          <Link className="flex" to={"/login"}>
            Se Connecter
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </Link>
        </li>
      </ul>

      <div className="m-1 flex text-center items-center sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      <Switch>
        <Route path="/" />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default Nav;
