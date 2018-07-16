import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
  <div className="jumbotron">
    <div>
      <h1>Mario Clicky Game</h1>
      <h5>Click on an image to earn points, but don't click on any more than once!</h5>
    </div>
    <div className="score">
      <h5>Score: {props.score} | Top Score: {props.topScore}</h5>
    </div>
  </div>
);

export default Jumbotron;
