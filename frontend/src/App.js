import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
        <Nav />
      <Switch>
        <Route  exact path="/" exact component={Home} />
        <Route    path="/login"  component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
