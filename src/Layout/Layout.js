import { Register } from "../Register/Register";
import { SignIn } from "../SignIn/SignIn";
import { SigTest } from "../Signals/SigTest";
// import { Signals } from "../Signals/Signals";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Layout = () => {
  return (
    <Router>
      <div className="container container-fluid">
        <Switch>
          <Route path="/signals">
            <SigTest />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
