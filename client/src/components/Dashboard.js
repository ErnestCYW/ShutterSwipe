import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Post from "./Post";
import trait_options from "./Trait_Options";
import DashboardNavbar from "./navbar/Dashboard_Navbar";

import useForm from "./useForm";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [pic_repo, setPicRepo] = useState([]);
  const [staged_trait, setStagedTrait] = useState("");
  const [traits, setTraits] = useState([]);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const { handleUsername, handleDescription, values, handleSubmit } = useForm();

  const getAll = async () => {
    try {
      const response = await fetch("/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const pic_repo = JSON.parse(parseRes.pic_repo);
      const traits = JSON.parse(parseRes.traits);

      setTraits(traits);
      setPicRepo(pic_repo);
      setName(parseRes.user_name);
      setUsername(parseRes.username);

      const getDescription = await fetch("/dashboard/description", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const descRes = await getDescription.json();

      if (descRes === false) {
        console.log("User has no description");
      } else {
        setDescription(descRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const stageFile = (e) => {
    setFile(e.target.files[0]); //one file upload only first file
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //default javascript object
    formData.append("file", file);

    try {
      const upload = await axios.post("/dashboard/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.token,
        },
      });

      if (upload) {
        console.log("uploaded");
        toast.success("Photo uploaded! Refresh to see change");
      }

      // getPicRepo();
      /*--- TODO ---
      window.location = "/dashboard"; refreshes page, and files are moved to picture_server, but react cannot find module. Async error?  
      */
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const getPicRepo = async () => {
    // e.preventDefault();
    const res = await fetch("/dashboard/getPics", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    });

    const parseRes = await res.json();
    const updatedPicRepo = JSON.parse(parseRes.updatedPicRepo);
    // // console.log(updatedPicRepo);
    setPicRepo(updatedPicRepo);

    toast.success("Image uploaded! Refresh to see change.");
  };

  //delete picture

  const deletePic = async (id) => {
    try {
      //make a delete fetch request
      const deletePic = await fetch(`/dashboard/${id}`, {
        method: "DELETE",
      });
      //makes you not need to refresh!
      setPicRepo(pic_repo.filter((pic) => pic.pic_id !== id));
      console.log(deletePic);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTraitChange = (event) => {
    setStagedTrait(event.target.value);
  };

  const uploadTrait = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/dashboard/uploadTrait`, {
        method: "GET",
        headers: {
          uploadedTrait: staged_trait,
          token: localStorage.token,
        },
      });

      const parseRes = await res.json();

      if (parseRes.added === true) {
        toast.success("Trait added!");
        const updatedTraits = JSON.parse(parseRes.updatedUserTraits);
        setTraits(updatedTraits);
      } else {
        toast.warning("Failed to add trait");
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const deleteTrait = async (id) => {
    try {
      const deleteTrait = await fetch(`/dashboard/traits/${id}`, {
        method: "DELETE",
      });
      setTraits(traits.filter((trait) => trait.trait_id !== id));
      console.log(deleteTrait);
    } catch (err) {
      console.error(err.message);
    }
  };

  //makes a fetch request to the restful API everytime a component is rendered
  useEffect(() => {
    getAll();
  }, []); //run if anything in bracket changes or else run only once

  //console.log(typeof traits);

  return (
    <div class="dashboard">
      <DashboardNavbar setAuth={setAuth} />
      <div class="row ps-2">
        <nav
          id="sidebarMenu"
          class="col-md-3 d-md-block sidebar collapse position-fixed shadow p-3 mb-5 rounded"
        >
          <row>
            <h3>
              {" "}
              {username}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                type="button"
                class="bi bi-gear text-muted"
                viewBox="0 0 16 16"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </h3>
            <span className="text-muted">{name}</span>
          </row>
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <p>{description}</p>
              <hr></hr>

              {/* Traits in side navbar */}
              <li class="nav-item">
                <button
                  id="dropdown"
                  class="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#traits-collapse"
                  aria-expanded="false"
                >
                  Traits{" "}
                </button>
                <div class="collapse" id="traits-collapse">
                  <form className="d-flex" onSubmit={uploadTrait}>
                    <div className="mb-3 row">
                      <div class="col-auto">
                        <input
                          name="trait"
                          id="inputTrait"
                          className="form-control"
                          placeholder="Add trait"
                          list="anrede"
                          onChange={handleTraitChange}
                        />
                      </div>
                      <datalist id="anrede">
                        {trait_options.map((trait) => {
                          return <option value={trait}></option>;
                        })}
                      </datalist>

                      <div className="col-auto">
                        <button className="btn btn-secondary">
                          <i className="bi bi-upload"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {traits.map((trait) => (
                      <tr id="user-trait" key={trait.trait_id}>
                        <td>
                          <span className="border border-secondary rounded-pill">
                            {trait.trait_name}
                            <i
                              className="bi bi-x"
                              width="18"
                              height="18"
                              viewBox="0 0 16 16"
                              type="button"
                              onClick={() => deleteTrait(trait.trait_id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <body class="col-md-9 ms-sm-auto px-md-4">
          <div className="title">
            <span className="dashboardTitle">Dashboard</span>
            <span>
              <button
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#editPicsModal"
              >
                Edit Photos
              </button>
            </span>
          </div>

          {/* Edit Profile */}
          <div
            class="modal fade"
            id="editProfileModal"
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
                  <form id="editProfileForm" onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label>New Username</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="new username"
                        value={values.username}
                        onChange={(e) => handleUsername(e)}
                      />
                    </div>
                    <div class="mb-3">
                      <label>New Description</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        value={values.description}
                        onChange={(e) => handleDescription(e)}
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
                    form="editProfileForm"
                    class="btn btn-primary"
                    aria-hidden="true"
                    // data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container-sm col-md-7 "> */}
          <form
            id="uploadPicForm"
            className="d-flex shadow p-3 mb-5 bg-body rounded container-sm"
            onSubmit={uploadFile}
          >
            <div className="row">
              <div className="col-auto">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={stageFile}
                />
              </div>

              <div className="col-auto">
                <i
                  className="bi bi-upload pt-2"
                  type="button"
                  onClick={uploadFile}
                ></i>
              </div>
            </div>
          </form>
          {/* </div> */}

          {/* Photo Grid */}

          <section>
            {pic_repo.map((pic) => (
              <div key={pic.pic_id} id="photograph" className="grid-img">
                <Post pic_id={pic.pic_id} />
              </div>
            ))}
          </section>

          {/* Semi working example v1.2
          <section>
            {pic_repo.map((pic) => (
              <div key={pic.pic_id} id="photograph" className="grid-img">
                <Post pic_id={pic.pic_id} />
              </div>
            ))}
          </section> */}

          <hr></hr>

          {/* <div className="photo-grid"> v1.1
            <div className="row gx-3 gy-4">
              {pic_repo.map((pic) => (
                <div
                  key={pic.pic_id}
                  id="photograph"
                  // className="align-self-center col-sm-4"
                  className="column"
                >
                  <Post pic_id={pic.pic_id} />
                </div>
              ))}
            </div>
          </div> */}

          {/* Edit pics modal */}
          <div
            class="modal fade"
            id="editPicsModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Pictures
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-body">
                  <div className="row gx-3 gy-4">
                    {pic_repo.map((pic) => (
                      <div
                        key={pic.pic_id}
                        id="photograph"
                        className="align-self-center col-sm-4"
                      >
                        <Post pic_id={pic.pic_id} />
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deletePic(pic.pic_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};

export default Dashboard;
