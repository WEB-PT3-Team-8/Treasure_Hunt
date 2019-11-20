// Function to get latest proof,
// find new proof,
// mine coin

import axios from "axios";
import sha256 from "js-sha256";

import { sleep } from "../sleep";

const PROOF_URL = "https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/";
const MINE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

const validProof = (lastproof, proof, difficulty) => {
  const hash = sha256(`${lastproof}${proof}`);
  const leading = hash.slice(0, difficulty);
  const zeros = Array(difficulty)
    .fill(0)
    .join("");
  return `${leading}` === `${zeros}`;
};

const getProof = (lastProof, difficulty) => {
  let proof = 0;
  while (!validProof(lastProof, proof, difficulty)) {
    proof += 1;
  }
  console.log(`proof: ${proof}`);
  return proof;
};

export const mine = async () => {
  const proof = await axios.get(PROOF_URL, { headers: headers });
  let cooldown = proof.data.cooldown;
  await sleep(cooldown * 1000);
  const lastProof = proof.data.proof;
  const difficulty = proof.data.difficulty;
  console.log(`last proof: ${lastProof}, difficulty: ${difficulty}`);
  const newProof = getProof(lastProof, difficulty);
  const mine = await axios.post(MINE_URL, { proof: newProof }, { headers: headers });
  console.log(mine.data);
  cooldown = mine.data.cooldown;
  await sleep(cooldown * 1000);
  return mine;
};
