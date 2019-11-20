// Function to move examine an item or player

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const EXAMINE_URL = BASE_URL + "examine/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const examine = async name => {
  const params = { name: name };
  try {
    const examine = await axios.post(EXAMINE_URL, params, { headers: headers });
    console.log(examine.data);
    const cooldown = examine.data.cooldown;
    console.log(`cooldown after examine: ${cooldown}`);
    await sleep(cooldown * 1000);
    return examine;
  } catch (error) {
    console.log(error);
  }
};
