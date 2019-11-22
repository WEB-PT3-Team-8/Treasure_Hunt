import { status } from "../actions/status";
import { dashMove } from "../actions/dashMove";
import { move } from "../actions/move";

const graph = require("../../data/graph.json");
const warp_graph = require("../../data/warp_graph.json");

export const moveORdash = async (current_room, path) => {
  let response = await status();
  const speed = response.data.speed;
  const abilities = response.data.abilities;
  for (let i = 0; i < path.length; i++) {
    if (abilities.indexOf("dash") !== -1 && i + 1 < path.length && path[i] === path[i + 1]) {
      // see if player can dash
      let room_count = 0;
      const rooms = [];
      let exits;
      while (path[i] === path[i + 1]) {
        room_count++;
        exits = graph[current_room] ? graph[current_room]["directions"] : warp_graph[current_room]["directions"];
        rooms.push(exits[path[i]]);
        i++;
        current_room = exits[path[i]];
      }
      exits = graph[current_room] ? graph[current_room]["directions"] : warp_graph[current_room]["directions"];
      rooms.push(exits[path[i]]);
      current_room = exits[path[i]];
      room_count++;
      const rooms_str = rooms.join(",");
      await dashMove(path[i], room_count, rooms_str);
    } else {
      const exits = graph[current_room] ? graph[current_room]["directions"] : warp_graph[current_room]["directions"];
      response = await move(path[i], exits[path[i]]);
      current_room = response.data.room_id;
    }
  }
  return current_room;
};
