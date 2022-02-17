import React from "react";
import Card from "../UI/Card";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          //*  {/* *map that array to a JSX element for every user of the array. we expect 'user' as an obj */}
          <li key={user.id}>
            {/* keys are essential for providing uniqueness */}
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
