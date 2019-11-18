// Find room with id=467 - Pirate Ry's
// move player to that room
// send request to change the name of the player

import axios from "axios";
import { sleep } from "./sleep";
import { findRoom } from "./findRoom";

const graph = require("../data/graph.json");
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
    const path = findRoom(current_room, 467);
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
