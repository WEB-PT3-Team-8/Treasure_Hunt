// Function for a player to drop an item
import axios from "axios";
import { sleep } from "../sleep";
import { status } from "./status";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";
const SELL_URL = BASE_URL + "sell/";
const key = process.env.REACT_APP_API_KEY;
const headers = { Authorization: `Token ${key}` };

export const sell = async item => {
  try {
    const response = await status();
    if (response.data.errors.length > 0) {
      return `Sorry something went wrong!: ${response.data.errors}`;
    }
    const inventory = response.data.inventory;
    console.log("INV", inventory);
    for (let i = 0; i < inventory.length; i++) {
      const params = { name: inventory[i], confirm: "yes" };
      const sell = await axios.post(SELL_URL, params, { headers: headers });
      console.log("Sold Item", sell);
      const cooldown = sell.data.cooldown;
      await sleep(cooldown * 1000);
    }
    return `You have sold your treasure.`;
  } catch (error) {
    console.log(error);
    return "Sorry something went wrong!";
  }
};
