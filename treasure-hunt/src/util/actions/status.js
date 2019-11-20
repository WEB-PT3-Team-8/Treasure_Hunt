// Function to return current status of player

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const STATUS_URL = BASE_URL + "status/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const status = async () => {
  try {
    let status = await axios.post(STATUS_URL, {}, { headers: headers });
    console.log(status);
    const cooldown = status.data.cooldown;
    await sleep(cooldown * 1000);
    return status;
  } catch (error) {
    console.log(error);
  }
};
