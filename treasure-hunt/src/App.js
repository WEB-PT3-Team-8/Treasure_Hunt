import React from "react";
import "./App.css";

// import { findTreasure } from "./util/traversals/findTreasure";
// import { changeName } from "./util/traversals/changeName";
import { wish } from "./util/traversals/wishing_well";
import { mineCoin } from "./util/traversals/mineCoin";
// import { prayShrine } from "./util/traversals/prayShrine";
import { parseGraph } from "./util/parse";
import { findRoom } from "./util/traversals/findRoom";
import { init } from "./util/actions/init";
import { moveORdash } from "./util/traversals/moveORdash";
import { pray } from "./util/actions/pray";
import { warp } from "./util/actions/warp";
import { catchSnitch } from "./util/traversals/catchSnitch";
import { take } from "./util/actions/take";

require("dotenv").config();

function App() {
  // findTreasure();
  // changeName();
  // wish().then(res => {
  //   console.log(res);
  //   mineCoin(res);
  // });
  // prayShrine(22); // fly to shrine to get flying power
  // parseGraph();
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
  catchSnitch();
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to Lambda's Treasure Hunt</h1>
      </header>
    </div>
  );
}

export default App;
