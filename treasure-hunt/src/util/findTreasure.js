import axios from "axios";
import { sleep } from "./sleep";

const graph = require("../data/graph.json");
const reverse_dir = { n: "s", s: "n", e: "w", w: "e" };
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const STATUS_URL = BASE_URL + "status/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "/move";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const findTreasure = async () => {
  try {
    console.log(headers);
    const status = await axios.post(STATUS_URL, {}, { headers: headers });
    cooldown = status.data.cooldown;
    const strength = status.data.strength;
    let encumbrance = status.data.encumbrance;
    await sleep(cooldown * 1000);
    if (encumbrance <= strength) {
      // find current room
      const init = await axios.get(INIT_URL, { headers: headers });
      cooldown = status.data.cooldown;
      await sleep(cooldown * 1000);
      const current_room = init.data.room_id;
      // const exits = init.data.exits;
      console.log(current_room);
      const treasureRoom = getTreasure(current_room);
      // if found treasure, pick it up
      console.log(`found treasure in ${treasureRoom}!`);
      encumbrance = 100;
    }
  } catch (error) {
    console.error(error);
  }
};

const getTreasure = async current_room => {
  console.log("finding treasure");
  let reverse;
  while (true) {
    const exits = graph[current_room]["directions"];
    console.log(exits);
    if (exits.length === 1) {
      const dirs = Object.keys(exits);
      if (exits[dirs[0]] === reverse) reverse = null;
    }
    // get random direction from exits
    const directions = new Set(Object.keys(exits));
    directions.delete(reverse); // prevent player from going back to previous room
    console.log(directions);
    const direction = directions.keys().next().value;
    console.log(direction);
    // move player in that direction
    const move = await axios.post(MOVE_URL, { direction: direction }, { headers: headers });
    console.log(`Moved in direction ${direction}`);
    console.log(move.data);
    cooldown = move.data.cooldown;
    await sleep(cooldown * 1000);
    const items = move.data.items;
    current_room = move.data.room_id;
    if (items.length > 0) return current_room;

    // store reverse direction in reverse so can't go back
    reverse = reverse_dir[direction];
    console.log(reverse);
  }
};
