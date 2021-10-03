import React from "react";

const Nav = () => {
  return (
    <div className="bg-green-900 p-4 flex justify-between text-white">
      <h1 className="flex-1 font-cookie text-3xl">QuestPaper</h1>

      <ul className="hidden sm:flex space-x-3 text-center items-center">
        <li>Home</li>
        <li>About Us</li>
        <li>Our Services</li>
        <li>Contact Us</li>
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
    </div>
  );
};

export default Nav;
