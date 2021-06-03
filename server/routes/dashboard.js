const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const express = require('express');
const fileUpload = require('express-fileupload');

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

router.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({msg: 'No file uploaded'}); //400 is bad request
  }

  const file = req.files.file;
  file.mv('${__dirname}/client/public/uploads/${file.name}', err => { //Moves file from client to picture_server
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({fileName: file.name, filePath: '/uploads/${file.name}'});
  });
});

module.exports = router;
