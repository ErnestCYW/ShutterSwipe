import React from "react";

//change post to async to solve bug????

function Post({ pic_id }) {
  return (
    <div>
      {pic_id}
      {
        <img
          width="500px"
          src={require(`../../../picture_server/${pic_id}.jpg`).default}
          alt="missing img"
        ></img>
      }
    </div>
  );
}

export default Post;
