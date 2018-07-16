import React from "react";
import "./Cards.css";

const Cards = props => (
    <div className="cards" onClick={() => props.handleClick(props.id)}>
      <img alt={props.name} src={props.image} />
    </div>
);

export default Cards;
