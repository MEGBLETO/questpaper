import React, { useState, useEffect } from "react";
import { useJwt} from "react-jwt";
import { useSelector } from "react-redux";
import Prodata from "../components/Prodata";

const Profile = () => {

  const token = localStorage.getItem("token");


  const mydecodedtoken = useJwt(token);

  useEffect(async() => {  
    const req = await mydecodedtoken
    if(req){

      console.log(req)
    }
 
  }, [token])
  

  return (
    <div className="">
      <Prodata  decodedToken={mydecodedtoken} />
    </div>
  );
};

export default Profile;
