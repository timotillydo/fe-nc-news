import React from "react";
import UserCard from "../Cards/UserCard";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => {
        return <UserCard {...user} />;
      })}
    </div>
  );
};

export default UserList;
