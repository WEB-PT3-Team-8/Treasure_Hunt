// Function for a player to pray

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const PRAY_URL = BASE_URL + "pray/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const pray = async () => {
  try {
    const pray = await axios.post(PRAY_URL, {}, { headers: headers });
    console.log(pray.data);
    const cooldown = pray.data.cooldown;
    await sleep(cooldown * 1000);
    return pray;
  } catch (error) {
    console.log(error);
  }
};
