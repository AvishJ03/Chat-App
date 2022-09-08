import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./setAvatar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    
  };
  useEffect(() => {
    async function getImage() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const img = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=93StrqjNk1TRZF`
        );
        const buffer = new Buffer(img.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    getImage();
  }, []);

  return (
    <div className="setAvatar">
      <div className="title-container">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selected === index ? "selected" : ""}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => setSelected(index)}
              />
            </div>
          );
        })}
      </div>
      <button className="submit" onClick={setProfilePicture}>Set as Profile Picture</button>
      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
