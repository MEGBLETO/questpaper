import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload"

import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route path="/upload" component={Upload} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
