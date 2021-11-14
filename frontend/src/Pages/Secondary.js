import React,{useState, useEffect} from "react";
import Doc from "../doc/formulaire.pdf";
import Viewer from "../components/Viewer";
import { Link } from "react-router-dom";
import axios from 'axios'

const Secondary = () => {

 const[docs, setDoc]=useState([])

const getdocs = async()=>{
      const result = await axios.get('http://localhost:5000/api/user/files')
        setDoc(result.data)
 
}


useEffect(()=>{
  getdocs();
},[])



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

          {docs.map(doc =>(
            //console.log(doc.sujet_id)
            <Viewer key={doc.sujet_id} Doc={'subjects/3f501498b8dcb2b315d0942aa6cfee60.pdf'} />
          ))}
       
        </div>
      </div>
    </div>
  );
};

export default Secondary;
