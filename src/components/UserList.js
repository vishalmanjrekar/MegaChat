import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const UserList = (props) => {
  const [userList, setUserList] = useState([]);

  const socketUrl = "http://localhost:5000";

  useEffect(() => {
    const socket = io(socketUrl);
    socket.emit("init", () => {
      console.log("init");
    });
    socket.on("users", (user) => {
      setUserList(user);
    });
  }, []);

  const handleAuthor = (e, author) => {
    e.preventDefault();
    const socket = io(socketUrl);
    socket.emit("adduser", { author });
    props.history.push({ pathname: "/chat", state: { author: author } });
  };

  return (
    <div className="user-list-wrap">
      <h3>Select a user</h3>
      <div className="user-list-section">
        {userList.map((user, index) => (
          <button onClick={(e) => handleAuthor(e, user)}>
            {" "}
            <span className="img-circle" />
            {user}
          </button>
        ))}
      </div>
    </div>
  );
};
export default UserList;
