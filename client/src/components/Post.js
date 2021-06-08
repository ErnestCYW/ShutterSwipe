import React from "react";

function Post({ pic_id }) {
  return (
    <div>
      {pic_id}
      {
        <img
          width="500px"
          src={require(`../../public/${pic_id}.jpg`).default}
          alt="missing img"
        ></img>
      }
    </div>
  );
}

export default Post;
