import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload"
import Offers from "./Pages/Offers";
import CookieConsent from "react-cookie-consent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {


  const loginStatus = useSelector((state) => state.login.value)
  console.log(loginStatus)
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <ProtectedRoute path="/profile"  isAuth={loginStatus} component={Profile}/>
        <ProtectedRoute path="/upload"isAuth={loginStatus} component={Upload}/>
        <ProtectedRoute path="/offers" isAuth={loginStatus}  component={Offers} />
      </Switch>
      <CookieConsent location="bottom" style={{ background: "#2B373B" }} buttonText="Je Comprends !" debug={true}>Ce site utillise des cookies pour une meilleur experience utillisateurs.</CookieConsent>
      <Footer />
    </Router>
  );
}

export default App;
