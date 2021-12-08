import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Viewer from "../components/Viewer";

const Corriger = () => {


    const [docs, setDoc] = useState([]);




    return (
        <div className="flex m-3  flex-col items-center  min-h-screen ">
      
  
        <div className="flex flex-col sm:flex-row w-full p-3 mb-8 bg-gray-800 text-white justify-evenly">
          <div>
            <p className="font-bold">Filtrer Par:</p>
          </div>
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="adresse">
              Id unique du Sujets:
            </label>
           <input className="p-2 focus:outline-none" name="sujet" type="text" />
          </div>
        </div>
  
        <div className="relative  min-h-screen ">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            {docs ? (
              docs.map((doc) => (
                <Viewer
                  key={doc.sujet_id}
                  id={doc.sujet_id}
                  Doc={`https://questpaper-subjects.s3.eu-west-3.amazonaws.com/${doc.nom_sujet}`}
                />
              ))
            ) : (
              <h1>No data found</h1>
            )}
          </div>
        </div>
      </div>
    )
}

export default Corriger
