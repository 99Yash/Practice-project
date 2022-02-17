import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  // *props.children is used for outputing 'Add User' text between the tags
  return (
    <button
      className={classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
