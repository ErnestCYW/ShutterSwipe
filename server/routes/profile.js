const router = require("express").Router();
const pool = require("../db");

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username); //Bug here on refresh - get "custom.css"

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

    //return custom JSON
    const toReturn = {
      user_name: `${user.rows[0].user_name}`,
      username: `${username}`,
      pic_repo: JSON.stringify(pic_repo.rows),
      traits: JSON.stringify(traits.rows),
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
