import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Megachat from "./components/Megachat";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/chat" component={Megachat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
