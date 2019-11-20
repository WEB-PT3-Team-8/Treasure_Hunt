const graph = require("../data/graph.json");

export const parseGraph = () => {
  const rooms = Object.keys(graph);
  for (let i = 0; i < rooms.length; i++) {
    const title = graph[i]["title"];
    if (title !== "A misty room" && title !== "A Dark Cave" && title !== "Mt. Holloway") console.log(title, i);
  }
};
