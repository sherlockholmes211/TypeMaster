import { placeholder } from "@babel/types";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Mainpage from "./components/pages/Mainpage";
import LandingPage from "./LandingPage";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/Signup";
import Services from "./components/pages/Services.js";
import ContactUs from "./components/pages/ContactUs.js";
import Signup from "./components/forms/Signup";
function App() {
  let history = useHistory();
  return (
    <div>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/services" exact>
              <Mainpage />
            </Route>
            <Route path="/contact-us" exact>
              <ContactUs />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
