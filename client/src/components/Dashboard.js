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
      console.log(traits);

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

  console.log(traits);

  return (
    <Fragment>
      <h1>Dashboard {name} </h1>

      {traits.map((trait) => (
        <tr key={trait.trait_id}>
          <Trait trait_name={trait.trait_name} />
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteTrait(trait.trait_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}

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
        <div className="row">
          <div className="col">Column</div>
          <div className="col">Column</div>
          <div className="col">Column</div>
        </div>
      </div>

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

      {/*
      <div className="container">
        <div className="row">
          {pic_repo.map((pic) => (
            <div key={pic.pic_id} id="photograph" className="align-self-center col-sm-4">
              <Post pic_id={pic.pic_id} />
            </div>
          ))}
        </div>
      </div>
      */}

    </Fragment>
  );
};

export default Dashboard;
