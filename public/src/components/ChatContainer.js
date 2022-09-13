import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import "./chatContainer.css";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";

const ChatContainer = ({ currentUser, currentChat }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getMessages() {
      const response = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    console.log(currentUser);
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    console.log(msg);
  };
  return (
    <>
      {currentChat && (
        <div className="chatContainer">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          <div className="chat-messages">
            {messages.map((msg) => {
              return (
                <div>
                  <div
                    classname={`message ${
                      msg.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
