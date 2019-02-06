import React from "react";
import ReactDOM from "react-dom";
import pkgjson from "./../package.json";
import Game from "./components/Game";
import "./index.css";

ReactDOM.render(
  <Game
    dimension={pkgjson.game.dimension}
    players={pkgjson.game.players}
    smiley={pkgjson.game.smiley}
  />,
  document.getElementById("root")
);
