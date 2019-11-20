// Function for a player to take an item

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const TAKE_URL = BASE_URL + "take/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const take = async item => {
  const params = { name: item };
  try {
    const take = await axios.post(TAKE_URL, params, { headers: headers });
    console.log(take.data);
    const cooldown = take.data.cooldown;
    await sleep(cooldown * 1000);
    return take;
  } catch (error) {
    console.log(error);
  }
};
