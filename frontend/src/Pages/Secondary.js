import React from "react";
import Doc from "../doc/formulaire.pdf";
import Viewer from "../components/Viewer";
import { Link } from "react-router-dom";

const Secondary = () => {
  return (
    <div className="flex m-3 flex-col items-center  min-h-screen ">
      <div className="relative  w-full m-4 p-3">
        <Link
          className="w-1/5 flex justify-center sm: absolute  right-2  -top-4 p-3   bg-gray-400 hover:bg-gray-200"
          to="/upload"
        >
          <div className="flex text-sm">
            <p>Upload</p>
          </div>
        </Link>
      </div>

      <div className="flex h-2/3 p-3 my-4 mx-1  sm:mx-auto w-full sm:w-1/2 shadow-md  bg-gray-100 justify-center">
        <input className="w-2/3 " type="text" />
        <input
          className="p-2 cursor-pointer"
          type="button"
          name="Search"
          value="Search"
        />
      </div>
      <div className="relative  min-h-screen ">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
          <Viewer Doc={Doc} />
        </div>
      </div>
    </div>
  );
};

export default Secondary;
