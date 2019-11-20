// Function for a player to pray

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const DASH_URL = BASE_URL + "dash/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const dashMove = async (direction, room_count, rooms_str) => {
  const params = { direction: direction, num_rooms: `${room_count}`, next_room_ids: rooms_str };
  try {
    const dash = await axios.post(DASH_URL, params, { headers: headers });
    console.log(dash.data);
    const cooldown = dash.data.cooldown;
    console.log(`cooldown after wove: ${cooldown}`);
    await sleep(cooldown * 1000);
    return dash;
  } catch (error) {
    console.log(error);
  }
};
