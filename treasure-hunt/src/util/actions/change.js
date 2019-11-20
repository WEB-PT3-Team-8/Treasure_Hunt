// Function for a player to change their name

import axios from "axios";
import { sleep } from "../sleep";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const CHANGE_NAME_URL = BASE_URL + "change_name/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const change = async item => {
  const params = { name: item };
  try {
    const name = await axios.post(
      CHANGE_NAME_URL,
      { name: process.env.REACT_APP_NAME, confirm: "aye" },
      { headers: headers }
    );
    console.log(name.data);
    const cooldown = name.data.cooldown;
    await sleep(cooldown * 1000);
    return name;
  } catch (error) {
    console.log(error);
  }
};
