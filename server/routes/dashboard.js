const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const express = require("express");
const fileUpload = require("express-fileupload");
const { response } = require("express");

router.get("/", authorization, async (req, res) => {
  try {
    //this user is from req.user in authorization
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    const num_of_pics = await pool.query(
      "SELECT COUNT(*) as num_of_pics FROM pics WHERE user_id = $1",
      [req.user]
    );

    const pic_repo = await pool.query(
      "SELECT pic_path FROM pics WHERE user_id = $1",
      [req.user]
    );
    console.log(pic_repo);

    //return custom JSON
    const toReturn = {
      "user_name": `${user.rows[0].user_name}`,
      "num_of_pics": `${num_of_pics.rows[0].num_of_pics}`,
      "pic_repo": JSON.stringify(pic_repo.rows)
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//upload route

router.post("/upload", authorization, async (req, res) => {
  //if no file is selected

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" }); //400 is bad request
  }

  //select file

  const file = req.files.file;

  //check if file is correct jpg/png/raw format

  //check if file already exists, allow for duplicates

  //add file to psql db
  const pic_path = `${__dirname}/../../picture_server/${file.name}`;

  const newPic = pool.query(
    "INSERT INTO pics (pic_path, user_id) VALUES ($1, $2) RETURNING *",
    [pic_path, req.user]
  );

  //move file from client to picture_server
  file.mv(pic_path, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: "/uploads/${file.name}" }); //returns a json
  });
});

module.exports = router;
