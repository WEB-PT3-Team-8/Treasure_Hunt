// Find room with id=55 - whishing well
// move player to that room

import axios from "axios";
import { sleep } from "./sleep";
import { findRoom } from "./findRoom";
import { ls8 } from "./ls8/ls8";

const graph = require("../data/graph.json");
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const EXAMINE_URL = BASE_URL + "examine/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const wish = async () => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    let current_room = init.data.room_id;
    let path = findRoom(current_room, 55);
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
    console.log("Arrived to the wishing well!!!");
    // examine the well
    const examine = await axios.post(EXAMINE_URL, { name: "WELL" }, { headers: headers });
    console.log(examine.data);
    cooldown = examine.data.cooldown;
    await sleep(cooldown * 1000);
    const description = examine.data.description;
    console.log(description); //Translated to "Mine your coin in room 120"
    const code = description.split("\n");
    code.shift();
    code.shift();
    return ls8(code);
  } catch (error) {
    console.error(error);
  }
};
