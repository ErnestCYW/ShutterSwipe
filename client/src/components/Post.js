import React from "react";

//change post to async to solve bug????

function Post({ pic_id }) {
  return (
    <div>
      {
        <img
          width="auto"
          src={require(`../../../picture_server/${pic_id}.jpg`).default}
          alt="missing img"
          data-bs-toggle="modal"
          data-bs-target="#picModal"
        ></img>
      }

      <div
        class="modal fade"
        id="picModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
