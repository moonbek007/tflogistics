import React from "react";
import "./css/App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./js/context";
import { reducer, defaultState } from "./js/reducer";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";

function App() {
  const [route, setRoute] = React.useState("/login");
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <Provider value={{ ...state, dispatch }}>
      <div className="App">
        {/* <Router>
          <Switch>
            <Route path="/login">
              <Form path="/login" />
            </Route>
            <Route path="/register">
              <Form path="/register" />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router> */}
        {route === "/login" ? (
          <Form path="/login" setRoute={setRoute} />
        ) : route === "/register" ? (
          <Form path="/register" setRoute={setRoute} />
        ) : route === "/dashboard" ? (
          <Dashboard setRoute={setRoute} />
        ) : (
          ""
        )}
      </div>
    </Provider>
  );
}

export default App;
