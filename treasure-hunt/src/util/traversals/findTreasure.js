/* 
  Function that would traverse the map looking for rooms that have a items 
  If it's a treasure, pick it up
  If the limit is reached, stop
  else, continues to look for rooms with items
*/

import { status } from "../actions/status";
import { init } from "../actions/init";
import { move } from "../actions/move";
import { take } from "../actions/take";

const graph = require("../../data/graph.json");
const reverse_dir = { n: "s", s: "n", e: "w", w: "e" };

export const findTreasure = async num => {
  let response;
  try {
    response = await status();
    if (response.data.errors.length > 0) {
      return `Sorry something went wrong!: ${response.data.errors}`;
    }
    const strength = num ? num : response.data.strength;
    let encumbrance = response.data.encumbrance;
    while (encumbrance < strength) {
      console.log(`encumbrance: ${response.data.encumbrance} strength: ${strength}`);
      response = await init();
      const current_room = response.data.room_id;
      const items = await findTreasureRoom(current_room);

      // if found treasure, pick it up
      console.log(`found treasure ${items}!`);
      for (let i = 0; i < items.length; i++) {
        await take(items[i]);
        response = await status();
        encumbrance = response.data.encumbrance;
        if (encumbrance >= strength) break;
      }
    }
    console.log("Go sell your treasure!");
    return `Found ${strength} treasures, ready to go sell it.`;
  } catch (error) {
    console.error(error);
    return "Sorry something went wrong!";
  }
};

const findTreasureRoom = async current_room => {
  console.log("finding treasure");
  let reverse;
  let items = [];
  while (items.length === 0) {
    const exits = graph[current_room]["directions"];
    console.log(exits);
    let directions = Object.keys(exits);
    if (directions.length === 1) {
      reverse = null;
    }
    directions = directions.filter(dir => dir !== reverse);
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const next_room_id = exits[direction];
    console.log(`next room: ${next_room_id}`);
    // move player in that direction
    const response = await move(direction, exits[direction]);
    items = response.data.items;
    current_room = response.data.room_id;

    // store reverse direction in reverse so can't go back
    reverse = reverse_dir[direction];
  }
  return items;
};
