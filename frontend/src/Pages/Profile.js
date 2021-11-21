import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";

import Prodata from "../components/Prodata";

const Profile = () => {


  const userdata = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(userdata);

  console.log(userdata)

  return (
    <div className="">
      <Prodata  decodedToken={decodedToken} />
    </div>
  );
};

export default Profile;
