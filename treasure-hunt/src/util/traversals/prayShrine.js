// Find room with id=461 - Linh's Shrine
// move player to that room

import { findRoom } from "./findRoom";
import { init } from "../actions/init";
import { pray } from "../actions/pray";
import { moveORdash } from "../traversals/moveORdash";

export const prayShrine = async room => {
  let response;
  try {
    response = await init();
    if (!response) {
      return `Sorry something went wrong!`;
    }
    let current_room = response.data.room_id;
    let path = findRoom(current_room, room);
    console.log(path);
    current_room = await moveORdash(current_room, path);
    const nameShrine = room === 461 ? "Linh's Shrine" : "winged deity Shrine";
    console.log(`Arrived to ${nameShrine}!!!`);
    // pray
    await pray();
  } catch (error) {
    console.error(error);
  }
};
