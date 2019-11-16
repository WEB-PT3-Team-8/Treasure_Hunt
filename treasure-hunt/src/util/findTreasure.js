import axios from "axios";
import { sleep } from "./sleep";

const graph = require("../data/graph.json");
const reverse_dir = { n: "s", s: "n", e: "w", w: "e" };
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const STATUS_URL = BASE_URL + "status/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const TAKE_URL = BASE_URL + "take/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

export const findTreasure = async () => {
  try {
    let status = await axios.post(STATUS_URL, {}, { headers: headers });
    cooldown = status.data.cooldown;
    const strength = status.data.strength;
    let encumbrance = status.data.encumbrance;
    await sleep(cooldown * 1000);
    while (encumbrance < strength) {
      console.log(`encumbrance: ${status.data.encumbrance} strength: ${strength}`);
      // find current room
      const init = await axios.get(INIT_URL, { headers: headers });
      cooldown = init.data.cooldown;
      await sleep(cooldown * 1000);
      const current_room = init.data.room_id;
      const items = await findTreasureRoom(current_room);
      if (items[0] === "pirate") {
        console.log("Found Pirate Ry!!!!");
        return;
      }
      // if found treasure, pick it up
      console.log(`found treasure ${items}!`);
      for (let i = 0; i < items.length; i++) {
        if (items[i] !== "tiny treasure" && items[i] !== "treasure") continue;
        const take = await axios.post(TAKE_URL, { name: items[i] }, { headers: headers });
        console.log(take.data);
        cooldown = take.data.cooldown;
        await sleep(cooldown * 1000);
        status = await axios.post(STATUS_URL, {}, { headers: headers });
        cooldown = status.data.cooldown;
        await sleep(cooldown * 1000);
        encumbrance = status.data.encumbrance;
        if (encumbrance >= strength) break;
      }
    }
    console.log("Go sell your treasure!");
  } catch (error) {
    console.error(error);
  }
};

const findTreasureRoom = async current_room => {
  console.log("finding treasure");
  // const visited = new Set();
  let reverse;
  let items = [];
  while (items.length === 0) {
    if (current_room === 467) return ["pirate"];
    const exits = graph[current_room]["directions"];
    console.log(exits);
    // console.log(`visited: ${visited}`);
    let directions = Object.keys(exits);
    if (directions.length === 1) {
      reverse = null;
    }
    directions = directions.filter(dir => dir !== reverse);
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const next_room_id = exits[direction];
    // visited.add(next_room_id);
    console.log(`next room: ${next_room_id}`);
    // move player in that direction
    const move = await axios.post(
      MOVE_URL,
      { direction: direction, next_room_id: `${exits[direction]}` },
      { headers: headers }
    );
    console.log(move.data);
    items = move.data.items;
    cooldown = move.data.cooldown;
    console.log(`cooldown after wove: ${cooldown}`);
    await sleep(cooldown * 1000);
    current_room = move.data.room_id;

    // store reverse direction in reverse so can't go back
    reverse = reverse_dir[direction];
  }
  return items;
};
