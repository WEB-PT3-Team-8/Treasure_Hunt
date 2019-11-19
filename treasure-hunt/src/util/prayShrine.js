// Find room with id=461 - Linh's Shrine
// move player to that room

import axios from "axios";
import { sleep } from "./sleep";
import { findRoom } from "./findRoom";

const graph = require("../data/graph.json");
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const STATUS_URL = BASE_URL + "status/";
const DASH_URL = BASE_URL + "dash/";
const PRAY_URL = BASE_URL + "pray/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const pray = async () => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    let current_room = init.data.room_id;
    let path = findRoom(current_room, 461);
    console.log(path);
    let status = await axios.post(STATUS_URL, {}, { headers: headers });
    cooldown = status.data.cooldown;
    const speed = status.data.speed;
    await sleep(cooldown * 1000);
    for (let i = 0; i < path.length; i++) {
      if (speed === 10 && i + 1 < path.length && path[i] === path[i + 1]) {
        // see if player can dash
        let room_count = 0;
        const rooms = [];
        let exits;
        while (path[i] === path[i + 1]) {
          room_count++;
          exits = graph[current_room]["directions"];
          rooms.push(exits[path[i]]);
          i++;
          current_room = exits[path[i]];
        }
        exits = graph[current_room]["directions"];
        rooms.push(exits[path[i]]);
        room_count++;
        const rooms_str = rooms.join(",");
        console.log(`rooms_str: ${rooms_str}`);
        console.log(`room_count: ${room_count}`);
        const dash = await axios.post(
          DASH_URL,
          { direction: path[i], num_rooms: `${room_count}`, next_room_ids: rooms_str },
          { headers: headers }
        );
        console.log(dash.data);
        cooldown = dash.data.cooldown;
        console.log(`cooldown after wove: ${cooldown}`);
        await sleep(cooldown * 1000);
      } else {
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
    }
    console.log("Arrived to Linh's Shrine!!!");
    // pray
    const pray = await axios.post(PRAY_URL, {}, { headers: headers });
    console.log(pray.data);
    cooldown = pray.data.cooldown;
    await sleep(cooldown * 1000);
  } catch (error) {
    console.error(error);
  }
};
