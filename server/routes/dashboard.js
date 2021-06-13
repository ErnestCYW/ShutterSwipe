const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const fs = require("fs");
const { restart } = require("nodemon");

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

    const traits = await pool.query(
      "SELECT trait_name, trait_id FROM traits WHERE user_id = $1",
      [req.user]
    );

    //return custom JSON
    const toReturn = {
      user_name: `${user.rows[0].user_name}`,
      pic_repo: JSON.stringify(pic_repo.rows),
      traits: JSON.stringify(traits.rows),
      trait_ids: traits.rows[1].trait_name,
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//get specific id (for delete query) (I THINK REDUNDANT)

// router.get("/:id", async (req, res) => {
//   try {
//     console.log(req.params);
//     const { id } = req.params;
//     const pic = await pool.query("SELECT * FROM pics WHERE pic_id = $1", [id]);
//     res.json(pic.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

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
  const new_pic_id = await pool.query(
    "INSERT INTO pics (pic_id, user_id) VALUES (DEFAULT, $1) RETURNING pic_id",
    [req.user]
  );

  //rename file to UUID and transfer from client to picture_server, stores as jpg
  file.mv(
    `${__dirname}/../../picture_server/${new_pic_id.rows[0].pic_id}.jpg`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: "/uploads/${file.name}",
        new_pic_id,
      }); //returns a json
    }
  );
});

// delete route

router.delete("/:id", async (req, res) => {
  //add an authorization here? --> fails if i add in an authorization... how to fix zz
  try {
    const { id } = req.params;

    const deletePic = await pool.query("DELETE FROM pics WHERE pic_id = $1", [
      id,
    ]);

    fs.unlink(`${__dirname}/../../picture_server/${id}.jpg`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json("Pic was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/uploadTrait", authorization, async (req, res) => {
  //check if user already has trait
  const hasTrait = await pool.query(
    "SELECT COUNT(*) as boolean FROM traits WHERE user_id = $1 and trait_name = $2",
    [req.user, req.header("uploadedTrait")]
  );

  if (hasTrait.rows[0].boolean === "0") {
    const uploaded_trait = await pool.query(
      "INSERT INTO traits (trait_id, user_id, trait_name) VALUES (DEFAULT, $1, $2) RETURNING trait_id",
      [req.user, req.header("uploadedTrait")]
    );
    res.json("Trait was uploaded");
  } else {
    res.json("User already has trait");
  }
});

router.delete("/traits/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTrait = await pool.query(
      "DELETE FROM traits WHERE trait_id = $1",
      [id]
    );

    console.log("should have deleted from DB");
    res.json("Trait was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
