// Find room with id=467 - Pirate Ry's
// move player to that room

import axios from "axios";
import { sleep } from "./sleep";

const graph = require("../data/graph.json");
const reverse_dir = { n: "s", s: "n", e: "w", w: "e" };
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const CHANGE_NAME_URL = BASE_URL + "change_name/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const changeName = async () => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    let current_room = init.data.room_id;
    const path = findPirate(current_room);
    console.log(path);
    for (let i = 0; i < path.length; i++) {
      const exits = graph[current_room]["directions"];
      const move = await axios.post(
        MOVE_URL,
        { direction: path[i], next_room_id: `${exits[path[i]]}` },
        { headers: headers }
      );
      console.log(move.data);
      cooldown = move.data.cooldown;
      console.log(`cooldown after wove: ${cooldown}`);
      await sleep(cooldown * 1000);
      current_room = move.data.room_id;
    }
    // change name
    const name = await axios.post(
      CHANGE_NAME_URL,
      { name: process.env.REACT_APP_NAME, confirm: "aye" },
      { headers: headers }
    );
    console.log(name.data);
    cooldown = name.data.cooldown;
    await sleep(cooldown * 1000);
    console.log("changed name!!!");
  } catch (error) {
    console.error(error);
  }
};

const findPirate = room => {
  // Use DFS to get to room 467
  const queue = [];
  const visited_rooms = new Set();

  queue.push([[null, room]]);
  while (queue.length > 0) {
    const path = queue.shift();
    const room = path[path.length - 1][1];
    if (room === 467) {
      const traversal_path = [];
      for (let i = 0; i < path.length; i++) {
        const pair = path[i];
        if (pair[0] !== null) traversal_path.push(pair[0]);
      }
      return traversal_path;
    }
    if (!visited_rooms.has(room)) {
      visited_rooms.add(room);
      const exits = graph[room]["directions"];
      for (const direction in exits) {
        const current_path = [...path];
        current_path.push([direction, exits[direction]]);
        queue.push(current_path);
      }
    }
  }
  return [];
};
