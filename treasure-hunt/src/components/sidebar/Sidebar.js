import React, { useState } from "react";
import styled from "styled-components";
import PlayerInfo from "./PlayerInfo.js";
import RoomInfo from "./RoomInfo.js";

const Sidebar = ({ playerInfo, currentRoom, selectedRoom, getRoomInfo }) => {
  const [ViewingPlayerInfo, setViewingPlayerInfo] = useState(true);
  return (
    <div className="sidebar-container">
      {ViewingPlayerInfo ? (
        <PlayerInfo playerInfo={playerInfo} />
      ) : (
        <RoomInfo currentRoom={currentRoom} selectedRoom={selectedRoom} />
      )}

      <div className="click-player-room-info">
        {ViewingPlayerInfo ? 
        
        }
      </div>
    </div>
  );
};

export default Sidebar;
// export default class Sidebar extends Component {
//   render() {
//     return <div className="sidebar-container">Player Info</div>;
//   }
// }
