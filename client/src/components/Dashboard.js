import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Post from "./Post";
import Trait from "./Trait";
import trait_options from "./Trait_Options";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Dashboard = ({ setAuth }) => {
  //passing prop setAuth

  //default use states
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [pic_repo, setPicRepo] = useState([]);
  const [traits, setTraits] = useState([]);

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const pic_repo = JSON.parse(parseRes.pic_repo);
      const traits = JSON.parse(parseRes.traits);
      //console.log(traits);

      setTraits(traits);
      setPicRepo(pic_repo);
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const stageFile = (e) => {
    setFile(e.target.files[0]); //one file upload only first file
    //setFilename(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //default javascript object
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/dashboard/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.token,
        },
      });
      toast.success("Image uploaded! Refresh to see change.");

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

  //delete picture

  const deletePic = async (id) => {
    try {
      //make a delete fetch request
      const deletePic = await fetch(`http://localhost:5000/dashboard/${id}`, {
        method: "DELETE",
      });
      //makes you not need to refresh!
      setPicRepo(pic_repo.filter((pic) => pic.pic_id !== id));
      console.log(deletePic);
    } catch (err) {
      console.error(err.message);
    }
  };

  const uploadTrait = async (trait) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/uploadTrait`, {
        method: "POST",
        headers: {
          uploadedTrait: trait,
          token: localStorage.token,
        },
      });
      console.log(res);
      window.location.reload(); //Auto refreshes
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
      const deleteTrait = await fetch(
        `http://localhost:5000/dashboard/traits/${id}`,
        {
          method: "DELETE",
        }
      );
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
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg2 d-md-block sidebar collapse"
      >
        <hr></hr>
        {name}
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <p>
              {" "}
              This is a paragraph, for users to add a description of themselves
            </p>
            <li class="nav-item"> Testing</li>
            <li class="nav-item"> Add a href</li>
            <li class="nav-item"> Profile things here</li>
            <li class="nav-item">
              {" "}
              Testing if this wraps around... Need to add collapse button as
              well as adjust width and length
            </li>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
              <div class="collapse" id="traits-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  {traits.map((trait) => (
                    <tr key={trait.trait_id}>
                      <Trait trait_name={trait.trait_name} />
                      <td>
                        <button
                          className="delete-button1"
                          onClick={() => deleteTrait(trait.trait_id)}
                        >
                          Delete
                        </button>
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
        <h1>Dashboard</h1>

        <DropdownButton
          className="mt-4"
          id="dropdown-basic-button"
          title="Select Trait"
          onSelect={uploadTrait}
        >
          {trait_options.map((trait) => (
            <Dropdown.Item eventKey={trait}>{trait}</Dropdown.Item>
          ))}
        </DropdownButton>
        <form onSubmit={uploadFile}>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label"></label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              multiple
              onChange={stageFile}
            />
          </div>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
        <div className="container">
          <div className="row gx-3 gy-4">
            {pic_repo.map((pic) => (
              <div
                key={pic.pic_id}
                id="photograph"
                className="align-self-center col-sm-4"
              >
                <Post pic_id={pic.pic_id} />
              </div>
            ))}
          </div>
        </div>
        <p>
          <a
            class="btn btn-outline-secondary"
            data-bs-toggle="collapse"
            href="#editPics"
            role="button"
            aria-expanded="false"
            aria-controls="editPics"
            // style={{ margin: { top: 5 } }}
          >
            Edit Photos
          </a>
        </p>
        <div class="collapse" id="editPics">
          {pic_repo.map((pic) => (
            //make sure key is unique (try delete and see if redundant)
            <tr key={pic.pic_id}>
              <Post pic_id={pic.pic_id} />
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePic(pic.pic_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
