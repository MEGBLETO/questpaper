import React,{useEffect} from 'react'
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload"
import Offers from "./Pages/Offers";
import CookieConsent from "react-cookie-consent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import {Route, Switch, useHistory,useLocation } from "react-router-dom";
import { situation } from "../src/features/Login";
import { useDispatch } from "react-redux";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Secondary from "./Pages/Secondary";
import Membership from './Pages/Membership';

function App() {
  const loginStatus = useSelector((state) => state.login.value)
  console.log(loginStatus)

  const dispatch = useDispatch();
  let history = useHistory();

  const location = useLocation();
  
  
  useEffect(() => {
  const token =  localStorage.getItem('token');
  if(token){
    dispatch(situation(true));
    history.push(location.pathname)
  }else{
    dispatch(situation(false));
  }
}, [])



  return (
    <>
    <Nav/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <ProtectedRoute path="/profile"  isAuth={loginStatus} component={Profile}/>
        <ProtectedRoute path="/upload"isAuth={loginStatus} component={Upload}/>
        <ProtectedRoute path="/offers" isAuth={loginStatus}  component={Offers} />
        <ProtectedRoute path="/secondary" isAuth={loginStatus} component={Secondary} />
        <ProtectedRoute path="/membership" isAuth={loginStatus} component={Membership} />
      </Switch>
      <CookieConsent location="bottom" style={{ background: "#2B373B" }} buttonText="Je Comprends !" debug={true}>Ce site utillise des cookies pour une meilleur experience utillisateurs.</CookieConsent>
      <Footer />
    </>
  );
}

export default App;
