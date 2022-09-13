import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import "./chatContainer.css";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

const ChatContainer = ({ currentUser, currentChat, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrival, setArrival] = useState(null);
  useEffect(() => {
    async function getMessages() {
      if (currentChat) {
        const response = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    getMessages();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (message) => {
        setArrival({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrival && setMessages((prev) => [...prev, arrival]);
  }, [arrival]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
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
