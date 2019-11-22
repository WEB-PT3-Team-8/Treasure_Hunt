import { findRoom } from "./findRoom";
import { init } from "../actions/init";
import { moveORdash } from "../traversals/moveORdash";

export const findShop = async () => {
  let response;
  try {
    response = await init();
    if (response.data.errors.length > 0) {
      return `Sorry something went wrong!: ${response.data.errors}`;
    }
    let current_room = response.data.room_id;
    let path = findRoom(current_room, 1);
    console.log(path);
    current_room = await moveORdash(current_room, path);
    console.log("Arrived at Shop!!!");
    return "You are at the shop, ready to sell.";
  } catch (error) {
    console.error(error);
    return "Sorry something went wrong!";
  }
};
