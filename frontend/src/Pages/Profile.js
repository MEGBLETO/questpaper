import React, { useState, useEffect } from "react";
import { useJwt} from "react-jwt";

import Prodata from "../components/Prodata";

const Profile = () => {

  const token = localStorage.getItem("token");
  const mydecodedtoken = useJwt(token);

  useEffect(async() => {   
    await console.log(mydecodedtoken)
  }, [])
  

  return (
    <div className="">
      <Prodata  decodedToken={mydecodedtoken} />
    </div>
  );
};

export default Profile;
