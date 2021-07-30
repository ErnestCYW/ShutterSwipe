const router = require("express").Router();
const pool = require("../db");

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    // console.log(username); //Bug here on refresh - get "custom.css"

    const getUserId = await pool.query(
      "SELECT user_id FROM user_username WHERE username = $1",
      [req.params.username]
    );

    const user_id = getUserId.rows[0].user_id;
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [user_id]
    );

    const pic_repo = await pool.query(
      "SELECT pic_id FROM pics WHERE user_id = $1",
      [user_id]
    );

    const traits = await pool.query(
      "SELECT trait_name, trait_id FROM traits WHERE user_id = $1",
      [user_id]
    );

    const hasDescription = await pool.query(
      "SELECT user_description FROM user_description WHERE user_id = $1",
      [user_id]
    );

    let description = {};

    if (hasDescription.rows.length === 1) {
      description = hasDescription.rows[0].user_description;
    }

    console.log(description);

    //return custom JSON
    const toReturn = {
      user_name: `${user.rows[0].user_name}`,
      username: `${username}`,
      pic_repo: JSON.stringify(pic_repo.rows),
      traits: JSON.stringify(traits.rows),
      description,
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// router.get("/description", async (req, res) => {
//   console.log("Here");
//   console.log(req.body);
//   res.json(false);
//   // console.log(req.header("target_user"));
//   // const description = await pool.query(
//   //   "SELECT user_description FROM user_description WHERE user_id = $1",
//   //   [req.headers.target_user]
//   // );

//   // if (description.rows.length !== 1) {
//   //   res.json(false);
//   // } else {
//   //   res.json(description.rows[0].user_description);
//   // }
// });

module.exports = router;
