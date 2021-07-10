const router = require("express").Router();
const pool = require("../db");
const cors = require("cors");

router.use(cors());

//params => http://localhost:5000/discover/:id => req.params ---> for unique
//query parameter => http://localhost:5000/discover/?name=timothy = req.query ---> for sorting and filtering

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const users = await pool.query(
      "SELECT * FROM users WHERE user_name ILIKE $1",
      [`%${name}%`]
    );

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
