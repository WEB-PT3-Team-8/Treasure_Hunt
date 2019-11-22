// Function to warp player to new dimension

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const WARP_URL = BASE_URL + "warp/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const warp = async () => {
  try {
    let response = await axios.post(WARP_URL, {}, { headers: headers });
    console.log(response);
    const cooldown = response.data.cooldown;
    await sleep(cooldown * 1000);
    console.log(`response status: ${response.status}`);
    if (response.status !== 200 || response.data.errors.length > 0) {
      console.log(`Sorry something went wrong!: ${response.data.errors}`);
      return `Sorry something went wrong!: ${response.data.errors}`;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
