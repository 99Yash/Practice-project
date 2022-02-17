import React from "react";
import classes from "./Card.module.css";
// !you have to import "something" from ... if you are using css modules

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
