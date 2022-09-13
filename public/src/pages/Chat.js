import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import "./chat.css";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrent(await JSON.parse(localStorage.getItem("chat-app-user")));
        setLoaded(true);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (current) {
      socket.current = io(host);
      socket.current.emit("add-user", current._id);
    }
  }, [current]);

  useEffect(() => {
    async function getContacts() {
      const data = await axios.get(`${allUsersRoute}/${current._id}`);
      setContacts(data.data);
    }
    if (current) {
      if (current.isAvatarImageSet) {
        getContacts();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [current]);

  function handleChatChange(chat) {
    setCurrentChat(chat);
  }

  return (
    <div className="chat">
      <div className="container">
        <Contacts
          contacts={contacts}
          user={current}
          changeChat={handleChatChange}
        />
        {loaded && currentChat === undefined ? (
          <Welcome user={current} />
        ) : (
          <ChatContainer
            currentUser={current}
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
