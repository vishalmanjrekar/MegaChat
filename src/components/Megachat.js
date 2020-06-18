import React, { useState, useEffect } from "react";
import Message from "./Message";
import io from "socket.io-client";
import "./style.css";

const Megachat = (props) => {
  const { author } = props.location.state;
  const [Author, setAuthor] = useState("");
  const [AvailableUsers, SetAvailableUsers] = useState([]);
  const [NewMessage, setNewMessage] = useState("");
  const [Messages, setMessages] = useState([]);
  const socketUrl = "http://localhost:5000";

  let socket = io(socketUrl);
  useEffect(() => {
    socket.on("availbleUsers", (users) => {
      SetAvailableUsers(users);
    });
    socket.on("message", (message) => {
      setMessages([...Messages, message]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [Messages]);

  useEffect(() => {
    socket.emit("message_init", () => {});
    socket.on("availbleUsers", (users) => {
      SetAvailableUsers(users);
    });
    socket.on("messages", (messages) => {
      setMessages(messages);

      console.log("Incoming messages:", messages);
    });
  }, []);

  const handleMessage = (user) => {
    setAuthor(user);
  };
  const sendMessage = () => {
    if (NewMessage === "") {
      alert("Enter a message");
    } else if (Author === "") {
      alert("please select a user to chat");
    } else {
      let obj = {
        body: NewMessage,
        timestamp: new Date().getTime(),
        author: author,
      };
      socket.emit("sendmessage", obj, () => {
        setNewMessage("");
      });
    }
  };
  return (
    <div className="main">
      <div className="message">
        <h2>
          <b>Chat</b>
        </h2>
        <h3>select a user to chat</h3>
        <div>
          {AvailableUsers && AvailableUsers.length
            ? AvailableUsers.map(
                (data, index) =>
                  data !== author && (
                    <div
                      className="message_chat"
                      key={index}
                      style={{ padding: "2px", margin: "5px" }}
                      onClick={() => handleMessage(data)}
                    >
                      <span className="img-circle" />
                      <h4>{data}</h4>
                    </div>
                  )
              )
            : ""}
        </div>
      </div>
      <div className="conversation message_chat">
        <Message author={Author} sender={author} Messages={Messages} />
        <div className="sendbar">
          <textarea
            placeholder="Enter your message"
            className="input"
            type="text"
            value={NewMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="sendBtn" onClick={() => sendMessage()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Megachat;
