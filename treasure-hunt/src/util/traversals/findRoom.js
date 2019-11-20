const graph = require("../../data/graph.json");

export const findRoom = (current, destination) => {
  // Use DFS to get to destination
  const queue = [];
  const visited_rooms = new Set();

  queue.push([[null, current]]);
  while (queue.length > 0) {
    const path = queue.shift();
    const room = path[path.length - 1][1];
    if (room === destination) {
      const traversal_path = [];
      for (let i = 0; i < path.length; i++) {
        const pair = path[i];
        if (pair[0] !== null) traversal_path.push(pair[0]);
      }
      return traversal_path;
    }
    if (!visited_rooms.has(room)) {
      visited_rooms.add(room);
      const exits = graph[room]["directions"];
      for (const direction in exits) {
        const current_path = [...path];
        current_path.push([direction, exits[direction]]);
        queue.push(current_path);
      }
    }
  }
  return [];
};
