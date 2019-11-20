import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com";

const wait = seconds => {
  let makeMS = seconds * 1000;
  return new Promise((res, rej) => setTimeout(res, makeMS));
};

const RoomInfo = ({ currentRoom, selectedRoom }) => {
  //const [currentRoom, selectedRoom, setCurrentRoom] = useState("");
  const handleRoomInfo = async () => {
    const roomStatus = await axios.post(`$BASE_URL}/api/adv/`, {});

    //setRoomDetails(roomStatus.data);
    // await wait(roomStatus.data.cooldown);
  };

  useEffect(() => {
    handleRoomInfo();
  }, []);

  if (currentRoom) {
    return (
      <div>
        <div className="roomInfoSideBar">
          <h3>{currentRoom.title}</h3>
          <p>Room ID: {currentRoom.room_id}</p>
          <p>Description: {currentRoom.description}</p>
          <p>Coordinates: {currentRoom.coordinates}</p>
          <p>Players: {currentRoom.players || "None"}</p>
          <p>Items: {currentRoom.items || "None"}</p>
          <p>Exits: {currentRoom.exits}</p>
          <p>Cooldown: {currentRoom.cooldown}</p>
          <p>Errors: {currentRoom.errors || "No Errors"}</p>
          <p>Messages: {currentRoom.messages || "No Messages"}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RoomInfo;
