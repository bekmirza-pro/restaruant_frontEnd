import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import UserStore from "./store/UserStore";
import FoodStore from "./store/FoodStore";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new FoodStore(),
    }}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
