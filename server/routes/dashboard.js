const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
//const upload = require("../middleware/upload");
const fs = require("fs");

router.get("/", authorization, async (req, res) => {
  try {
    //this user is from req.user in authorization
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    const pic_repo = await pool.query(
      "SELECT pic_id FROM pics WHERE user_id = $1",
      [req.user]
    );

    //React cannot access anything outside of client so need to copy required files into public folder
    pic_repo.rows.forEach(pic => {
      fs.copyFile(
        `/Users/ernestcyw/Desktop/Orbital/ShutterSwipe/picture_server/${pic.pic_id}.jpg`,
        `/Users/ernestcyw/Desktop/Orbital/ShutterSwipe/client/public/${pic.pic_id}.jpg`,
        (err) => {
          if (err) throw err;
          console.log("error moving files to front end");
        }
      )
    });

    //return custom JSON
    const toReturn = {
      "user_name": `${user.rows[0].user_name}`,
      "pic_repo": JSON.stringify(pic_repo.rows)
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

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
  const new_pic_id = await pool.query(
    "INSERT INTO pics (pic_id, user_id) VALUES (DEFAULT, $1) RETURNING pic_id",
    [req.user]
  );

  //rename file to UUID and transfer from client to picture_server, stores as jpg
  file.mv(`${__dirname}/../../picture_server/${new_pic_id.rows[0].pic_id}.jpg`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: "/uploads/${file.name}" }); //returns a json
  });
});

module.exports = router;
