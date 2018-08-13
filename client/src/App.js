import React, { Component } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LobbyPage from "./components/LobbyPage";
import { Link, Route } from "react-router-dom";
import * as routes from "./constants/routes";
import "./css/main.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path={routes.HOME} component={() => <HomePage />} />
        <Route exact path={routes.LOBBY} component={() => <LobbyPage />} />
        <Route exact path={routes.ROOM} component={() => <Dashboard />} />
      </div>
    );
  }
}

export default App;
