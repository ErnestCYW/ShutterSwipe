const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const fs = require("fs");
const vision = require("@google-cloud/vision");

router.get("/", authorization, async (req, res) => {
  try {
    //this user is from req.user in authorization
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    const username = await pool.query(
      "SELECT username FROM user_username WHERE user_id = $1",
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
      username: `${username.rows[0].username}`,
      pic_repo: JSON.stringify(pic_repo.rows),
      traits: JSON.stringify(traits.rows),
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//TODO: PROFILE PICS
router.get("/profilePic", authorization, async (req, res) => {
  const profilePic = await pool.query(
    "SELECT profile_pic FROM profile_pic WHERE user_id = $1",
    [req.user]
  );

  if (profilePic.rows.length !== 1) {
    res.json(false);
  } else {
    res.json(username.rows[0].username);
  }
});

router.get("/description", authorization, async (req, res) => {
  const description = await pool.query(
    "SELECT user_description FROM user_description WHERE user_id = $1",
    [req.user]
  );

  if (description.rows.length !== 1) {
    res.json(false);
  } else {
    res.json(description.rows[0].user_description);
  }
});

//edit profile
router.post("/edit", authorization, async (req, res) => {
  try {
    const form = req.body;

    if (form.username) {
      const alreadyExists = await pool.query(
        "SELECT * FROM user_username WHERE username = $1",
        [form.username]
      );
      if (alreadyExists.rows.length == 1) {
        res.status(401).json("Username is taken");
      } else {
        const updateUsername = await pool.query(
          "UPDATE user_username SET username = $1 WHERE user_id = $2",
          [form.username, req.user]
        );
      }
    }

    if (form.description) {
      const hasDescription = await pool.query(
        "SELECT * FROM user_description WHERE user_id = $1",
        [req.user]
      );

      if (hasDescription.rows.length === 1) {
        const updateDescription = await pool.query(
          "UPDATE user_description SET user_description = $1 WHERE user_id = $2",
          [form.description, req.user]
        );
      } else {
        const insertDescription = await pool.query(
          "INSERT INTO user_description (user_id, user_description) VALUES ($1, $2)",
          [req.user, form.description]
        );
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});

//upload route

router.post("/upload", authorization, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" }); //400 is bad request
  }

  const file = req.files.file;

  //check if file is correct jpg/png/raw format

  //check if file already exists, allow for duplicates

  const new_pic_id = await pool.query(
    "INSERT INTO pics (pic_id, user_id, pic_score) VALUES (DEFAULT, $1, DEFAULT) RETURNING pic_id",
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

  //Tag file using cloud vision API
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./APIKey.json",
  });
  const [result] = await client.labelDetection(
    `${__dirname}/../../picture_server/${new_pic_id.rows[0].pic_id}.jpg`
  );
  const labels = result.labelAnnotations;
  await Promise.all(
    labels.map(
      async (label) =>
        await pool.query(
          "INSERT INTO labels (label_id, pic_id, label_name) VALUES (DEFAULT, $1, $2)",
          [new_pic_id.rows[0].pic_id, label.description]
        )
    )
  );
});

// delete route

router.delete("/:id", async (req, res) => {
  //add an authorization here? --> fails if i add in an authorization... how to fix zz
  try {
    const { id } = req.params;

    const deleteLikes = await pool.query(
      "DELETE FROM likes where pic_id = $1",
      [id]
    );

    const deleteDislikes = await pool.query(
      "DELETE FROM dislikes where pic_id = $1",
      [id]
    );

    const deleteLabels = await pool.query(
      "DELETE FROM labels WHERE pic_id = $1",
      [id]
    );

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

//router.delete("/traits/:id", deleteTraits);
router.delete("/traits/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTrait = await pool.query(
      "DELETE FROM traits WHERE trait_id = $1",
      [id]
    );

    //console.log("should have deleted from DB");
    res.json("Trait was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
