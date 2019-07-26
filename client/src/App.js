import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Jokes from "./components/Jokes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route
          exact
          path="/"
          component={() => {
            return (
              <div>
                <p>Welcome {localStorage.getItem("username")}</p>
              </div>
            );
          }}
        />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/jokes" component={Jokes} />
      </div>
    </BrowserRouter>
  );
}

export default App;
