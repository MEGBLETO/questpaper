import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'

const Registration = () => {


  const [userData, setUserData] = useState()

  const { register, handleSubmit } = useForm();
  const onSubmit = data => setUserData(data)


const postData = async() =>{
   console.log(userData)

if(userData){
  const name = await userData.name;
  const sirname = await userData.sirname
  const email = await userData.email
  const  password = await userData.password
  const confirmPassword = await userData.pwdrepeat
  const adresse = await userData.adresse
  
  
  axios.post('http://localhost:5000/api/inscrire',{
    sirname: sirname,
    name:name,
    email:email,
    password: password,
    confirmPassword: confirmPassword,
    adresse: adresse
  }).then(() =>{
    alert("success")
  })
}
}


  useEffect(() =>{
    postData() 
  },[userData])




    return (
        <div className="flex relative flex-col p-4 items-center min-h-screen  dark:bg-black">
        <div className="shadow-lg m-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  bg-white p-8 justify-center min-h-full ">

          <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="name">
                Sirname:
              </label>
              <input className="p-2 border-2 w-full" {...register("sirname")} type="text" name="sirname" />
            </div>
              
          <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="name">
                Name:
              </label>
              <input className="p-2 border-2 w-full" {...register("name")} type="text" name="name" />
            </div>



            <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="email">
                Email:
              </label>
              <input className="p-2 border-2 w-full"  {...register("email")} type="email" name="email" />
            </div>
  
            <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="adresse">
                Adresse:
              </label>
              <input className="p-2 border-2 w-full"  {...register("adresse")} type="text" name="adresse" />
            </div>
         

            <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="password">
              Mot de Passe:
              </label>
              <input className="p-2 border-2 w-full" {...register("password")} type="password" name="password" />
            </div>

            <div className="flex flex-col ">
              <label className="font-bold p-2" htmlFor="password">
                Confirmez le Mot de passe:
              </label>
              <input className="p-2 border-2 w-full" {...register("pwdrepeat")} type="password" name="pwdrepeat" />
            </div>
  
            <input
              className="cursor-pointer mx-auto mt-3 bg-gray-900 text-white p-3"
              type="submit"
              value="S'inscrire"
            />
  
            <p className="p-5 font-cookie text-xl text-center">
              Pas Encore Inscrit?
              <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
                <Link to="/login"> Connectez-vous Maintenant.</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    )
}

export default Registration;
