import React, { Fragment, useState, useEffect } from "react";
import Post from "./Post";

const Feed = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [pic_feed, setPicFeed] = useState([]);

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/feed/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      setAuth(true);
      const parseRes = await response.json();
      const queue = JSON.parse(parseRes.inQueue);
      console.log(parseRes.user_name);

      setPicFeed(queue);
      setName(parseRes.user_name);
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
      <div style={{ paddingTop: "30px" }}></div>
      <div className="container-md border rounded">
        <div class="text-center mt-5">
          <h1> {name + "'s"} Feed </h1>
        </div>

        {pic_feed.map((pic) => (
          <tr key={pic.pic_id}>
            <Post pic_id={pic.pic_id} />
            <h4>testing center alignment</h4>

            <div className="row justify-content-center text-center">
              <h2 className="col">
                <button
                  className="btn btn-warning"
                  onClick={() => likePic(pic.pic_id)}
                >
                  like
                </button>
              </h2>
              <h2 className="col">
                <button
                  className="btn btn-warning"
                  onClick={() => dislikePic(pic.pic_id)}
                >
                  dislike
                </button>
              </h2>
            </div>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default Feed;
