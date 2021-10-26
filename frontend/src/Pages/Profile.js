import React, { useState, useEffect } from "react";
import data from "../MOCK_DATA.json";

const Profile = () => {
  const [userinfo, setUserinfo] = useState();

  useEffect(async () => {
    setUserinfo(data[0]);
  }, []);

  return (
    <div className="h-screen flex flex-col p-4">
      <div className="flex   border-2 h-full">
        <div className=" bg-green-600 flex-1 flex-col h-full ">
          <div className="flex flex-col ">
            <p>test</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
            <p>hellllllllpo</p>
          </div>
        </div>
        <div className="flex-1 bg-red-500">
          <div className="relative inset-y-1/3 h-2/3 transform -translate-y-1/3 flex  flex-col text-center justify-items-center">
            <div className="border-b-2 ">
              <h1 className="font-bold text-2xl">
               
              </h1>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;