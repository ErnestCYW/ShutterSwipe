const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
//const upload = require("../middleware/upload");
//const express = require("express");
const fileUpload = require("express-fileupload");

router.get("/", authorization, async (req, res) => {
  try {
    //this user is from req.user in authorization
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/upload", (req, res) => {
  //if no file is selected

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" }); //400 is bad request
  }

  //select file

  const file = req.files.file;
  console.log(req.files.file);

  //check if file is correct jpg/png/raw format

  //check if file already exists, allow for duplicates

  //add file to psql db
  const image_path = `${__dirname}/../../picture_server/${file.name}`;

  console.log(image_path);
  console.log(req.user);

  const newPic = pool.query(
    "INSERT INTO pics (image_path, user_id) VALUES ($1, $2) RETURNING *",
    [image_path, req.user]
  );

  //move file from client to picture_server
  file.mv(`${__dirname}/../../picture_server/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: "/uploads/${file.name}" }); //returns a json
  });
});

module.exports = router;
