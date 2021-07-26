import React, { useState, useEffect } from "react";

function Post({ pic_id }) {
  const imgRef = React.createRef();

  const handleClick = () => {
    const initWidth = imgRef.current.clientWidth;
    const initHeight = imgRef.current.clientHeight;

    console.log(initHeight + initWidth);
  };

  var img = new Image();
  img.onload = function () {
    console.log(this.width + "x" + this.height);
  };

  img = require(`../../../picture_server/${pic_id}.jpg`);

  // const currImg = require(`../../../picture_server/${pic_id}.jpg`);
  // console.log(currImg);

  return (
    <div>
      <div className="dashboard-image">
        {
          <img
            ref={imgRef}
            src={require(`../../../picture_server/${pic_id}.jpg`).default}
            alt="missing img"
            // data-bs-toggle="modal"
            // data-bs-target={`#${pic_id}`}
          ></img>
        }

        {/* <div
        class="modal fade"
        id={`${pic_id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={require(`../../../picture_server/${pic_id}.jpg`).default}
                alt="missing img"
              ></img>
            </div>
          </div>
        </div>
      </div> */}
      </div>
      {/* <button onClick={handleClick}>Get Value</button> */}
    </div>
  );
}

export default Post;
