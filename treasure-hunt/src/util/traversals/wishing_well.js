// Find room with id=55 - whishing well
// move player to that room
// Examine the well, and get the clue
// send the clue to be decoded by ls8 function
// return the decoded room where player has to go to mine coin

import { findRoom } from "./findRoom";
import { ls8 } from "../ls8/ls8";
import { move } from "../actions/move";
import { init } from "../actions/init";
import { examine } from "../actions/examine";
import { moveORdash } from "../traversals/moveORdash";

const graph = require("../../data/graph.json");

export const wish = async () => {
  let response;
  try {
    response = await init();
    let current_room = response.data.room_id;
    let path = findRoom(current_room, 55);
    console.log(path);
    current_room = await moveORdash(current_room, path);
    console.log("Arrived to the wishing well!!!");
    // examine the well
    response = await examine("WELL");
    const description = response.data.description;
    console.log(description); //Translated to "Mine your coin in room ---"
    const code = description.split("\n");
    code.shift();
    code.shift();
    return ls8(code);
  } catch (error) {
    console.error(error);
  }
};
