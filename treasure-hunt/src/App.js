import React from "react";
import "./App.css";

import Traversals from "./components/Traversals";
import { parseGraph } from "./util/parse";

require("dotenv").config();

function App() {
  // prayShrine(22); // fly to shrine to get flying power
  parseGraph();
  // init().then(res => {
  //   console.log(res);
  //   const currentRoom = res.data.room_id;
  //   console.log(`current room: ${currentRoom}`);
  //   const path = findRoom(currentRoom, 704);
  //   console.log(path);
  //   moveORdash(currentRoom, path).then(res => {
  //     console.log(res);
  //     // pray().then(res => console.log(res));
  //   });
  //   // take()
  // });
  // warp().then(res => console.log(res));
  // catchSnitch();

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
