import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";


const Login = () => {
//To implement the user redirection fonctionality

let history = useHistory();




  //getting login data through react hook forms and setting it using usestate
  const [logindata, setLoginData] = useState()


  //Dealing with the response i get back from the server after the login phase
  const [message, setMessage] = useState("")

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setLoginData(data);


const postLoginData  = async() =>{
const email = logindata.email;
const password = logindata.password

axios.post('http://localhost:5000/api/user/login',
{
  email: email , 
  password: password
}).then((response) =>{
  if(response.status === 200){
      history.push('/profile')
  }
}).catch((error) =>{
  history.push('/login')
  setMessage(error.response.data.message)
})
} 



useEffect(() => {
  if(logindata){
    postLoginData()
  }

}, [logindata])


  return (
    <div className="flex relative flex-col p-4 items-center min-h-screen dark:bg-black">
      <div className=" shadow-lg m-auto">
       <h1 className="text-red-800 text-center">{message}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white p-8 justify-center min-h-full ">
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="email">
              Email:
            </label>
            <input className="p-1 sm:p-2 border-2 w-full" {...register("email")} required type="email" name="email" />
          </div>


          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Password:
            </label>
            <input className="p-1 sm:p-2  border-2 w-full"   {...register("password")} required type="password" name="password" />
          </div>

          <input
            className="cursor-pointer mx-auto my-3 bg-gray-900 text-white p-3"
            type="submit"
            value="Se connecter" 
          />

          <p className="p-4 font-cookie text-xl text-center">
            Pas Encore Inscrit?{" "}
            <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
              <Link exact to="register">Inscrivez-vous Maintenant.</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
