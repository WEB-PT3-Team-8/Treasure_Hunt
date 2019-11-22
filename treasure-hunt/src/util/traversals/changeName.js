// Find room with id=467 - Pirate Ry's
// move player to that room
// send request to change the name of the player

import { findRoom } from "./findRoom";
import { init } from "../actions/init";
import { change } from "../actions/change";
import { moveORdash } from "../traversals/moveORdash";

export const changeName = async () => {
  let response;
  try {
    response = await init();
    if (response.data.errors.length > 0) {
      return `Sorry something went wrong!: ${response.data.errors}`;
    }
    let current_room = response.data.room_id;
    const path = findRoom(current_room, 467);
    console.log(path);
    current_room = await moveORdash(current_room, path);
    // change name
    await change();
    console.log("changed name!!!");
    return `Your name has been changed to ${process.env.REACT_APP_NAME}`;
  } catch (error) {
    console.error(error);
  }
};
