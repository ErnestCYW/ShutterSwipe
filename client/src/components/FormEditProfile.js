import React from "react";
import useForm from "./useForm";

//------------------
// Currently not working.
// Find a way to reroute.
//------------------

const FormEditProfile = () => {
  const { handleChange, values, handleSubmit } = useForm();

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Edit Profile
      </button>
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="editForm" onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label>New Username</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="new username"
                    value={values.username}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label>New Description</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    value={values.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                form="editForm"
                class="btn btn-primary"
                aria-hidden="true"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProfile;
