import React from "react";
import "./App.css";

import { findTreasure } from "./util/findTreasure";
import { changeName } from "./util/changeName";

require("dotenv").config();

function App() {
  // findTreasure();
  changeName();
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to Lambda's Treasure Hunt</h1>
      </header>
    </div>
  );
}

export default App;
