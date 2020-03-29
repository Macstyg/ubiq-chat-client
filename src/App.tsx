import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Messages from "./pages/Messages/Messages";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat" component={Messages} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
