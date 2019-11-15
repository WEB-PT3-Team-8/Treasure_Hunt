import React from "react";
import "./App.css";

import { findTreasure } from "./util/findTreasure";

require("dotenv").config();

function App() {
  findTreasure();
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to Lambda's Treasure Hunt</h1>
      </header>
    </div>
  );
}

export default App;
