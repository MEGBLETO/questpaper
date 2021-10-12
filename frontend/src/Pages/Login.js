import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex relative flex-col p-4 items-center min-h-screen dark:bg-black">
      <div className=" shadow-lg m-auto">
        <form className="flex flex-col bg-white p-8 justify-center min-h-full ">
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="email">
              Email:
            </label>
            <input className="p-1 sm:p-2 border-2 w-full" type="email" name="email" />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Password:
            </label>
            <input className="p-1 sm:p-2  border-2 w-full" type="password" name="pwd" />
          </div>

          <input
            className="cursor-pointer mx-auto my-3 bg-gray-900 text-white p-3"
            type="submit"
            value="Se connecter" 
          />

          <p className="p-4 font-cookie text-xl text-center">
            Pas Encore Inscrit?{" "}
            <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
              <Link exact to="register">Inscrivez-vous Maintenant.</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
