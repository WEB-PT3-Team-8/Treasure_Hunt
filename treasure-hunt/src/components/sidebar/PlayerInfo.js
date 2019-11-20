import React, { useState, useEffect } from "react";
import axios from "axios";

const wait = seconds => {
  let makeMS = seconds * 1000;
  return new Promise((res, rej) => setTimeout(res, makeMS));
};

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com";
const PlayerInfo = ({ playerInfo }) => {
  const [playerDetails, setPlayerDetails] = useState("");

  const handlePlayerDetails = async () => {
    const playerStatus = await axios.post(`${BASE_URL}/api/adv/status`, {});

    setPlayerDetails(playerStatus.data);
    await wait(playerStatus.data.cooldown);
  };

  useEffect(() => {
    handlePlayerDetails();
  }, []);

  if (playerDetails) {
    const playerInventory = playerDetails.inventory.join(", ");
    return (
      <div>
        <div className="playerSidebar">
          <h3>{playerDetails.name}</h3>
          <p>Cooldown: {playerDetails.cooldown}</p>
          <p>Encumbrance: {playerDetails.encumbrance}</p>
          <p>Strength: {playerDetails.strength}</p>
          <p>Speed: {playerDetails.speed}</p>
          <p>Gold: {playerDetails.gold}</p>
          <p>BodyWear: {playerDetails.bodywear || "Nothing Yet"}</p>
          <p>FootWear: {playerDetails.footwear || "Nothing Yet"}</p>
          <p>Inventory: {playerInventory || "Empty"}</p>
          <div className="playerSidebarMessages">
            <p>Player Status: {playerDetails.status}</p>
            <p>Errors: {playerDetails.errors || "No Errors"}</p>
            <p>Player Messages: {playerDetails.messages || "No Messages"}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PlayerInfo;
