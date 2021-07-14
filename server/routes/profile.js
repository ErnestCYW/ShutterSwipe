const router = require("express").Router();
const pool = require("../db");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id); //Bug here on refresh - get "custom.css"

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.params.id]
    );

    const username = await pool.query(
      "SELECT username FROM user_username WHERE user_id = $1",
      [req.params.id]
    );

    const pic_repo = await pool.query(
      "SELECT pic_id FROM pics WHERE user_id = $1",
      [req.params.id]
    );

    const traits = await pool.query(
      "SELECT trait_name, trait_id FROM traits WHERE user_id = $1",
      [req.params.id]
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

module.exports = router;
