import React from 'react'
import Doc from "../doc/formulaire.pdf";
import Viewer from '../components/Viewer'

const Secondary = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-200">
            <div className="flex h-1/2 p-3 my-4  mx-auto w-full sm:w-1/2 bg-gray-400 justify-center">
                <input className="w-1/2 " type="text" />
                <input className="p-2 cursor-pointer" type="button" name="Search" value="Search"  />
            </div>
         <div className="relative grid inset-y-1/3 h-full place-items-center grid-cols-2 sm:grid-col-2 gap-5">
         <Viewer Doc={Doc}/>
          <Viewer Doc={Doc}/>
          <Viewer Doc={Doc}/>
          <Viewer Doc={Doc}/>
         </div>
          
        </div>
    )
}

export default Secondary
