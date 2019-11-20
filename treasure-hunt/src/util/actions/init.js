// Function to return current room of player

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const INIT_URL = BASE_URL + "init/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const init = async () => {
  try {
    const init = await axios.get(INIT_URL, { headers: headers });
    const cooldown = init.data.cooldown;
    await sleep(cooldown * 1000);
    return init;
  } catch (error) {
    console.log(error);
  }
};
