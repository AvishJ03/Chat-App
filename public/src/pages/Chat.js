import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute } from "../utils/APIRoutes";
import "./chat.css";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrent(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    getUser();
  }, []);
  useEffect(() => {
    async function getContacts() {
      const data = await axios.get(`${allUsersRoute}/${current._id}`);
      setContacts(data.data);
    }
    if (current) {
      if (current.isAvatarImageSet) {
        getContacts();
        console.log(current);
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
        <Welcome user={current} />
      </div>
    </div>
  );
};

export default Chat;
