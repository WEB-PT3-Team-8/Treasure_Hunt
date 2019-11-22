// Find room with id=decode room - Mine room
// move player to that room
// mine a coin

import { findRoom } from "./findRoom";
import { init } from "../actions/init";
import { mine } from "../actions/mine";
import { moveORdash } from "../traversals/moveORdash";

export const mineCoin = async room => {
  let response;
  try {
    response = await init();
    let current_room = response.data.room_id;
    console.log(`Finding path to room: ${room}`);
    let path = findRoom(current_room, parseInt(room));
    console.log(path);
    current_room = await moveORdash(current_room, path);
    console.log("Arrived to mine coin!!!");
    // Mine coin
    await mine();
    return `Mined a coin!`;
  } catch (error) {
    console.error(error);
  }
};
