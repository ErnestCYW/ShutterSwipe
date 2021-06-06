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

router.post('/upload', authorization, async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({msg: 'No file uploaded'}); //400 is bad request
    }

    const pic_id = await pool.query(
      "INSERT INTO pics(pic_id,user_id) VALUES(DEFAULT,$1) RETURNING pic_id", //cannot use await here?
      [req.user]
    );

    const file = req.files.file;
    file.mv(`${__dirname}/../../picture_server/${pic_id}`, err => { //Moves file from client to picture_server
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    })

    //res.json({fileName: file.name, filePath: `${__dirname}/../../picture_server/${file.name}`});
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
