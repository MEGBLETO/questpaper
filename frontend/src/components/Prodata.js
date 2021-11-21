import React,{useState, useEffect} from 'react'
import { decodeToken } from 'react-jwt'




const Prodata = (decodedToken) => {

    console.log(decodedToken)

    const [data, setdata]=  useState()


useEffect(async() => {

    if(decodeToken){
        await setdata(decodeToken)
         console.log(data)
    }
}, [])

    return (
        <div className="h-screen flex flex-col p-4">
        <div className="flex flex-col text-3xl p-3 items-center  justify-center border-2">
          <h1>Profile</h1>
        </div>
        <div className="flex   border-2 h-full">
          <div className="flex-1 text-center flex-col h-full ">
            <div>
              {/* <h1>{data.user_id}</h1>
              <h1>{data.user_sirname}</h1>
              <h1>{data.user_name}</h1>
              <h1>{data.user_email}</h1> */}
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
