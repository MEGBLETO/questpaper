import React, { useState, useEffect } from "react";
import data from "../MOCK_DATA.json";

const Profile = () => {
  const [userinfo, setUserinfo] = useState();

  useEffect(async () => {
    setUserinfo(data[0]);
  }, []);

  return (
    <div className="h-screen flex flex-col p-4">
      <div className="flex flex-col text-3xl p-3 items-center  justify-center border-2">
        <h1>Profile</h1>
      </div>
      <div className="flex   border-2 h-full">
        <div className="flex-1 text-center flex-col h-full ">
          <div>
            <h1>John Smith</h1>
          </div>
          <div>
            <h1>Membership</h1>
            <input type="toggle" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
