
import { findRoom } from "./findRoom";
import { ls8 } from "../ls8/ls8";
import { init } from "../actions/init";
import { examine } from "../actions/examine";
import { moveORdash } from "../traversals/moveORdash";

export const findShop = async () => {
  let response;
  try {
    response = await init();
    let current_room = response.data.room_id;
    let path = findRoom(current_room, 1);
    console.log(path);
    current_room = await moveORdash(current_room, path);
    console.log("Arrived at Shop!!!");
    // Find Shop and Sell
  }
  catch (error) {
    console.error(error);
  }
};