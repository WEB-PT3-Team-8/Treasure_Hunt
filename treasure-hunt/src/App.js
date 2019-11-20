import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import "./App.css";

import { findTreasure } from "./util/findTreasure";
import { changeName } from "./util/changeName";
import { wish } from "./util/wishing_well";
import { mine } from "./util/mineCoin";

import axios from "axios";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/headernav/Header";

const BASE_URL = "https://lambda-treasure-hunt.herokuapp.com";
const graphData = require("./data/graph.json");
require("dotenv").config();

/* function App() {
  // findTreasure();
  // changeName();
  wish().then(res => {
    console.log(res);
    mine(res);
  }); */

const App = () => {
  const [selectedRoom, getSelectedRoom] = useState("NONE");
  const [isSelectingRoom, setIsSelectingRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");

  const getDirections = roomId => {
    let room = graphData[roomId];

    let exits = {};
    room.exits.forEach(direction => {
      exits[direction] = room[direction];
    });
    return exits;
  };

  const getRoomInfo = async (room = undefined) => {
    if (!room) {
      const { data } = await axios.get(`${BASE_URL}/api/adv/init/`);
      let cooldown = data.cooldown;

      let exits = getDirections(room.room_id);
      room = { ...room, ...exits };
    }
    setCurrentRoom(room);
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  return (
    <div className="App">
      <Header />
      <Sidebar
        currentRoom={currentRoom}
        getRoomInfo={getRoomInfo}
        selectedRoom={selectedRoom}
        getSelectedRoom={getSelectedRoom}
      />
    </div>
  );
};

/* class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: "state",
      playerInfo: null,
      currentRoom: null,
      errors: null,
      graph: {},
      cooling: false,
      lastRoom: null
    };
  } */

export default App;
