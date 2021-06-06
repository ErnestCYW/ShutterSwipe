import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = ({ setAuth }) => {
  //passing prop setAuth

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  //get pics
  const [pics, setPics] = useState(false);

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.messagE);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  const stageFile = (e) => {
    setFile(e.target.files[0]); //one file upload only
    setFilename(e.target.files[0].name);
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

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  //GETPICS TEST - tim --------------------

  async function getPics() {
    fetch("http://localhost:5000/dashboard/pictures")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // console.log(data);
        setPics(data);
      });
  }

  useEffect(() => {
    getPics();
  }, []);

  //GETPICS TEST - tim --------------------

  useEffect(() => {
    getName();
  }, []); //bracket makes one request only

  return (
    <Fragment>
      <h1>Dashboard {name} </h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
      <form onSubmit={uploadFile}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            {filename}
          </label>
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
      <div>{pics ? pics : "There is no pic data available"}</div>
    </Fragment>
  );
};

export default Dashboard;
