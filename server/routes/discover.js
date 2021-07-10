const router = require("express").Router();
const pool = require("../db");

//params => http://localhost:5000/discover/:id => req.params ---> for unique
//query parameter => http://localhost:5000/discover/?name=timothy = req.query ---> for sorting and filtering

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const users = await pool.query(
      "SELECT * FROM users WHERE user_name ILIKE $1",
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

module.exports = router;
