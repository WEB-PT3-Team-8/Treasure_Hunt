// Function to move player in a specified direction

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const MOVE_URL = BASE_URL + "move/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const move = async (direction, nextRoom = null) => {
  const params = nextRoom ? { direction: direction, next_room_id: `${nextRoom}` } : { direction: direction };
  try {
    const move = await axios.post(MOVE_URL, params, { headers: headers });
    console.log(move.data);
    const cooldown = move.data.cooldown;
    console.log(`cooldown after wove: ${cooldown}`);
    await sleep(cooldown * 1000);
    return move;
  } catch (error) {
    console.log(error);
  }
};
