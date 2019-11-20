// Function for a player to pray

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const TRANS_URL = BASE_URL + "transmogrify/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const transmogrify = async name => {
  const params = { name: name };
  try {
    const trans = await axios.post(TRANS_URL, params, { headers: headers });
    console.log(trans.data);
    const cooldown = trans.data.cooldown;
    await sleep(cooldown * 1000);
    return trans;
  } catch (error) {
    console.log(error);
  }
};
