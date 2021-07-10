const router = require("express").Router();
const pool = require("../db");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("called");

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
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
