// Function for a player to drop an item

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const DROP_URL = BASE_URL + "drop/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const drop = async item => {
  const params = { name: item };
  try {
    const drop = await axios.post(DROP_URL, params, { headers: headers });
    console.log(drop.data);
    const cooldown = drop.data.cooldown;
    await sleep(cooldown * 1000);
    return drop;
  } catch (error) {
    console.log(error);
  }
};
