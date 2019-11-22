import React from "react";
import "./App.css";

import Traversals from "./components/Traversals";
import { parseGraph } from "./util/parse";

require("dotenv").config();

function App() {
  // prayShrine(374); // get the warp power
  parseGraph();

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to Lambda's Treasure Hunt</h1>
        <Traversals />
      </header>
    </div>
  );
}

export default App;
