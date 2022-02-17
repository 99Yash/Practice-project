import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import ErrorModal from "./ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState(); //* initial value of useState is undef

  const addUserHandler = (event) => {
    event.preventDefault(); // *prevent request sent on submission

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "please enter a valid name and age",
      });
      return; //*for validation
    }
    if (+enteredAge < 1) {
      //* 'plus' sign is used to force-convert enteredAge(str) to number
      setError({
        title: "invalid age",
        message: "please enter a valid name and age(>0)",
      });
      return; //*for proper form validation
    }

    props.onAddUser(enteredUsername, enteredAge); //!! data is there in UsersList. we need to add list to main App. but AddUser and USersList dont have parent child r'ship. So, common parent is App.js. So we add props there and then call it here.

    // *setting these to empty strings and adding value prop to those JSX elements are both necessary for resetting the form
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  //* " like 'className' vs 'class' in css, similarly in react we have 'htmlFor' and not just 'for'"
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={enteredUsername}
            type="text"
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            value={enteredAge}
            type="number"
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
