const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    //gets pics from a certain account
    const pic_repo = await pool.query(
      "SELECT pic_id FROM pics WHERE user_id = 'e66680e0-ccad-498a-8a54-64dd977cecd3' "
    );

    const toReturn = {
      pic_repo: JSON.stringify(pic_repo.rows),
    };
    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
