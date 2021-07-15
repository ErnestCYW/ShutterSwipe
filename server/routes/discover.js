const router = require("express").Router();
const pool = require("../db");

//params => http://localhost:5000/discover/:id => req.params ---> for unique
//query parameter => http://localhost:5000/discover/?name=timothy = req.query ---> for sorting and filtering

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const users = await pool.query(
      "SELECT * FROM users LEFT JOIN user_username ON users.user_id = user_username.user_id WHERE user_name ILIKE $1",
      [`%${name}%`]
    );

    const toReturn = {
      matched_users: users.rows,
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const username = await pool.query(
      "SELECT username FROM user_username WHERE user_id = $1",
      [user_id]
    );

    console.log(username.rows[0]);

    res.json(username.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
