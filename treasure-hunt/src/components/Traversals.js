import React, { useState } from "react";

import { findTreasure } from "../util/traversals/findTreasure";
import { findShop } from "../util/traversals/findShop";
import { sell } from "../util/actions/sell";
import { changeName } from "../util/traversals/changeName";
import { wish } from "../util/traversals/wishing_well";
import { mineCoin } from "../util/traversals/mineCoin";
import { status } from "../util/actions/status";
import { transmogrify } from "../util/actions/transmogrify";
import { init } from "../util/actions/init";
import { findRoom } from "../util/traversals/findRoom";
import { moveORdash } from "../util/traversals/moveORdash";

const Traversals = () => {
  const [message, setMessage] = useState("");
  const [num, setNum] = useState(undefined);

  const treasure = () => {
    findTreasure(num).then(new_message => setMessage(new_message));
  };
  const shop = () => {
    findShop().then(new_message => setMessage(new_message));
  };
  const sellTreasure = () => {
    sell().then(new_message => setMessage(new_message));
  };
  const name = () => {
    changeName().then(new_message => setMessage(new_message));
  };
  const mine = () => {
    wish().then(res => {
      console.log(res);
      const message1 = `Mining coin in room ${res}`;
      mineCoin(res).then(new_message => setMessage(`${message1} ... ${new_message}`));
    });
  };
  const trans = () => {
    status().then(res1 => {
      const inventory = res1.data.inventory;
      if (inventory.length > 0) {
        init().then(res2 => {
          let current_room = res2.data.room_id;
          const path = findRoom(current_room, 495);
          console.log(path);
          moveORdash(current_room, path).then(res => {
            transmogrify(inventory[0]).then(res3 => {
              setMessage(res3.data.messages[0]);
            });
          });
        });
      } else {
        setMessage("Inventory Empty. Please find items first.");
      }
    });
  };
  return (
    <div className='Traversals'>
      <label className='label'>
        How many treasure (optional):
        <input className='input' type='number' name='num' value={num} onChange={e => setNum(e.target.value)} />
      </label>
      <button className='Button' onClick={treasure}>
        1- Find Treasure
      </button>
      <button className='Button' onClick={shop}>
        2- Find Shop
      </button>
      <button className='Button' onClick={sellTreasure}>
        3- Sell Treasure
      </button>
      <button className='Button' onClick={name}>
        4- Change Your Name
      </button>
      <button className='Button' onClick={mine}>
        5- Mine a coin
      </button>
      <button className='Button' onClick={trans}>
        6- Transform an item
      </button>
      <div className='message'>{message}</div>
    </div>
  );
};

export default Traversals;
