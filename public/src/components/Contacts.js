import React, { useEffect, useState } from "react";
import "./contacts.css";

const Contacts = ({ contacts, user, changeChat }) => {
  const [username, setUsername] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  useEffect(() => {
    if (user) {
      setImage(user.avatarImage);
      setUsername(user.username);
    }
  }, [user]);
  const changeCurrentChat = (index, contact) => {
    setSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {image && username && (
        <div className="contacts">
          <div className="brand">
            <img src="/assets/logo.svg" alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="cont">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${index === selected ? "selected2" : ""}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${image}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{username}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
