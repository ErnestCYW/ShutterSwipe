import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Post from "./Post";

const Dashboard = ({ setAuth }) => {
  //passing prop setAuth

  //default use states
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [pic_repo, setPicRepo] = useState([
    {
      pic_id: "00000000-0000-0000-0000-000000000000",
    },
  ]);
  //const [filename, setFilename] = useState("Choose File");
  //const [uploadedFile, setUploadedFile] = useState({})

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      //console.log(parseRes);
      const pic_repo = JSON.parse(parseRes.pic_repo);

      setPicRepo(pic_repo);
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  const stageFile = (e) => {
    setFile(e.target.files[0]); //one file upload only first file
    //setFilename(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/dashboard/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.token,
          },
        }
      );

      //const { fileName, filePath } = res.data;
      //setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  //runs after every render
  useEffect(() => {
    getAll();
  }, []); //run if anything in bracket changes or else run only once

  return (
    <Fragment>
      <h1>Dashboard {name} </h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
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

      {pic_repo.map((pic) => (
        <Post pic_id={pic.pic_id} />
      ))}
    </Fragment>
  );
};

export default Dashboard;
