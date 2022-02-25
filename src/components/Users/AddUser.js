import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "./ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef(); //*  useRef --> an object that has the real DOM. it has a 'current' property and under that a 'value' property

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState(); //* initial value of useState is undef

  const addUserHandler = (event) => {
    event.preventDefault(); // *prevent request (reload) sent on submission
    const enteredName = nameInputRef.current.value;
    const eneteredUserAge = ageInputRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      eneteredUserAge.trim().length === 0
    ) {
      setError({
        title: "invalid input",
        message: "please enter a valid name and age",
      });
      return; //*for form validation
    }
    if (+eneteredUserAge < 1) {
      //*  save values retrieved from the refs
      //* 'plus' sign is used to force-convert enteredAge(str) to number
      setError({
        title: "invalid age",
        message: "please enter a valid name and age(>0)",
      });
      return; //*for proper form validation
    }

    //* data is there in UsersList. we need to add list to main App. but AddUser and USersList dont have parent child r'ship. So, common parent is App.js. So we add props there and then call it here.(lifting the state up)
    props.onAddUser(enteredName, eneteredUserAge);
    //! rarely use refs to manipulate DOM. this is fine as we are just resetting the value. here we are just changing what the user entered
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    // *setting these to empty strings and adding value prop to those JSX elements are both necessary for resetting the form
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  //* " like 'className' vs 'class' in css, similarly in react we have 'htmlFor' and not just 'for'"
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title} //*outputing the errorModal conditionally.
          message={error.message}
          onConfirm={errorHandler} //* what happens after clicking the Close button
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="off" //*no more suggestions on input
            ref={nameInputRef}
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
            // value={enteredAge}
            // onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
