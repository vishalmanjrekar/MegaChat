import React from "react";
import moment from "moment";
import "../App.css";

function Message(props) {
  const renderMessages = () => {
    return props.Messages && props.Messages.length
      ? props.Messages.map((data, index) => {
          return (
            <div
              className={
                data.author === props.sender
                  ? "infoBar rightInnerContainer"
                  : "infoBar leftInnerContainer"
              }
              key={index}
            >
              <span className="body-content">
                <div className="header-title">
                  <h5>{data.author}</h5>
                  <h6> {moment(data.timestamp).format("HH:mm")}</h6>
                </div>
                <p>{data.body}</p>
              </span>
            </div>
          );
        })
      : "";
  };
  return (
    <React.Fragment>
      <div className="conversation_msg">
        <h3 className="title">Conversation</h3>
        {props.author && (
          <div className="author">
            <span className="img-circle" />
            <h4>{props.author}</h4>
          </div>
        )}
      </div>
      <div className="message-body">
        {props.Messages && props.author && renderMessages()}
      </div>
    </React.Fragment>
  );
}
export default Message;
