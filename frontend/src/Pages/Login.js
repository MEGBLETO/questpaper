import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col p-4 items-center h-screen">
      <div className="relative   top-10 shadow-lg  w-2/3 h-2/3 sm:w-1/3 h-1.8/3 sm:top-10">
        <form className="flex flex-col bg-white p-8 justify-center h-full ">
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="email">
              Email:
            </label>
            <input className="border-2 w-full" type="email" name="email" />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Password:
            </label>
            <input className="border-2 w-full" type="password" name="pwd" />
          </div>

          <input
            className="cursor-pointer mx-auto my-3 bg-gray-900 text-white p-3"
            type="submit"
            name="Se connecter"
          />

          <p className="p-4 font-cookie text-xl text-center">
            Pas Encore Inscrit?{" "}
            <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
              Inscrivez-vous Maintenant.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
