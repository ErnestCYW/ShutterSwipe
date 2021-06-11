const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/discover", async (req, res) => {
  try {
    res.json(req.query);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
