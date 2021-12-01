import React,{useState, useEffect} from 'react'
import { decodeToken } from 'react-jwt'
import Loader from './Loader'





const Prodata = ({decodedToken}) => {



    const [data, setData]=  useState()

   useEffect(async() =>{
     if(await decodedToken){
       console.log(await decodeToken)
     }
        //  setData(await decodedToken)
   },[decodeToken])

    return (
      decodeToken?<Loader/> :
        <div className="h-screen flex flex-col p-4">
        <div className="flex flex-col text-3xl p-3 items-center  justify-center border-2">
          <h1>Profile</h1>
        </div>
        <div className="flex   border-2 h-full">
          <div className="flex-1 text-center flex-col h-full ">
            <div>
              {console.log(data)}
            </div>
            <div>
              <h1>Membership</h1>
              <input type="toggle" />
            </div>
          </div>
        </div>
      </div>
      
    )
}

export default Prodata
