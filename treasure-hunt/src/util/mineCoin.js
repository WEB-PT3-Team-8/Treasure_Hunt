// Find room with id=120 - Mine room
// move player to that room

import axios from "axios";
import { sleep } from "./sleep";
import { findRoom } from "./findRoom";

const graph = require("../data/graph.json");
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const mine = async () => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    let current_room = init.data.room_id;
    let path = findRoom(current_room, 120);
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
    console.log("Arrived to mine coin!!!");
    // Mine coin
  } catch (error) {
    console.error(error);
  }
};
