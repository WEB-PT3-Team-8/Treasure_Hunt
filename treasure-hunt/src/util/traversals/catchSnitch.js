// Find the room 555 - wishing well
// examine the well

import { findRoom } from "./findRoom";
import { ls8 } from "../ls8/ls8";
import { init } from "../actions/init";
import { examine } from "../actions/examine";
import { moveORdash } from "../traversals/moveORdash";
import { take } from "../actions/take";

export const catchSnitch = async () => {
  let response;
  while (true) {
    try {
      response = await init();
      if (!response) {
        return `Sorry something went wrong!`;
      }
      console.log(`response status: ${response.status}`);
      let current_room = response.data.room_id;
      if (current_room < 500) return "You have to warp before catching the snitch";
      let path = findRoom(current_room, 555);
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
      const answer = ls8(code);
      console.log(answer);
      path = findRoom(555, parseInt(answer));
      console.log(path);
      current_room = await moveORdash(555, path);
      console.log("CATCH IT!!!!!");
      response = await take("golden snitch");
      console.log(response.data);
      if (response.data.errors.length === 0) {
        return `You grabbed the snitch! Try again!`;
      }
    } catch (error) {
      console.error(error);
      console.log(`response status: ${error.status}`);
      break;
    }
  }
};
