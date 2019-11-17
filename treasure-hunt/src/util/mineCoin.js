// Find room with id=120 - Mine room
// move player to that room

import axios from "axios";
import sha256 from "js-sha256";

import { sleep } from "./sleep";
import { findRoom } from "./findRoom";

const graph = require("../data/graph.json");
const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const MOVE_URL = BASE_URL + "move/";
const PROOF_URL = "https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/";
const MINE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };
let cooldown;

const validProof = (lastproof, proof, difficulty) => {
  // const hash = sha256.create();
  // hash.update(`${lastproof}${proof}`);
  // hash.hex();
  const hash = sha256(`${lastproof}${proof}`);
  const leading = hash.slice(0, difficulty);
  const zeros = Array(difficulty)
    .fill(0)
    .join("");
  // console.log(`zeros: ${zeros}, leading: ${leading}`);
  return `${leading}` === `${zeros}`;
};

const getProof = (lastProof, difficulty) => {
  let proof = 0;
  // console.log(validProof(lastProof, proof, difficulty));
  while (!validProof(lastProof, proof, difficulty)) {
    proof += 1;
  }
  console.log(`proof: ${proof}`);
  return proof;
};

export const mine = async room => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    let current_room = init.data.room_id;
    console.log(`Finding path to room: ${room}`);
    let path = findRoom(current_room, parseInt(room));
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
    const proof = await axios.get(PROOF_URL, { headers: headers });
    cooldown = proof.data.cooldown;
    await sleep(cooldown * 1000);
    const lastProof = proof.data.proof;
    const difficulty = proof.data.difficulty;
    console.log(`last proof: ${lastProof}, difficulty: ${difficulty}`);
    const newProof = getProof(lastProof, difficulty);
    const mine = await axios.post(MINE_URL, { proof: newProof }, { headers: headers });
    console.log(mine.data);
    cooldown = mine.data.cooldown;
    await sleep(cooldown * 1000);
  } catch (error) {
    console.error(error);
  }
};
