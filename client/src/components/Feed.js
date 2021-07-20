import React, { Fragment, useState, useEffect } from "react";
import Post from "./Post";

const Feed = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [pic_feed, setPicFeed] = useState([]);
  const [posted_by, setPostedBy] = useState("");

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/feed/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      setAuth(true);
      const parseRes = await response.json();
      const queue = JSON.parse(parseRes.inQueue);

      setPicFeed(queue);
      setName(parseRes.user_name);
      setPostedBy(parseRes.posted_by);
    } catch (err) {
      console.error(err.message);
    }
  };

  const nextPic = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/feed/nextPhoto/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      const pic = JSON.parse(parseRes.nextPic);

      setPicFeed(pic);
    } catch (err) {
      console.error(err.message);
    }
  };

  const likePic = async (pic_id) => {
    try {
      const likePic = await fetch("http://localhost:5000/feed/like/", {
        method: "POST",
        headers: { token: localStorage.token, pic_id: pic_id },
      });

      console.log(likePic);
      nextPic();
    } catch (err) {
      console.error(err.message);
    }
  };

  const dislikePic = async (pic_id) => {
    try {
      const dislikePic = await fetch("http://localhost:5000/feed/dislike/", {
        method: "POST",
        headers: { token: localStorage.token, pic_id: pic_id },
      });

      console.log(dislikePic);
      nextPic();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="feed">
      <div className="text-center text-muted display-4 bg-light w-100 py-3">
        {name + "'s"} Feed
      </div>

      {pic_feed.length === 0 ? (
        <div className="text-center display-1 mt-5">
          {" "}
          No Pictures To Display
          <div className="display-5"> Check Back Later! </div>{" "}
        </div>
      ) : (
        pic_feed.map((pic) => (
          <div>
            <div
              className="feedPicContainer d-flex justify-content-center bg-dark"
              key={pic.pic_id}
            >
              <img
                src={
                  require(`../../../picture_server/${pic.pic_id}.jpg`).default
                }
                className="bg-light"
                alt="missing img"
              />
            </div>
            <div className="mb-4 d-flex fixed-bottom justify-content-around text-center">
              <button
                className="btn btn-teal"
                onClick={() => likePic(pic.pic_id)}
              >
                <i
                  className="bi bi-hand-thumbs-up-fill"
                  style={{ "font-size": "30px", color: "whitesmoke" }}
                />
              </button>
              <div className="lead"> Posted By: {posted_by} </div>
              <button
                className="btn btn-orange"
                onClick={() => dislikePic(pic.pic_id)}
              >
                <i
                  className="bi bi-hand-thumbs-down-fill"
                  style={{ "font-size": "30px", color: "whitesmoke" }}
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
