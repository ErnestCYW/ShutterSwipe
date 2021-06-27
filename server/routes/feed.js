const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    //Gets first photo
    const inQueue = await pool.query(
      "SELECT pics.pic_id FROM pics LEFT JOIN likes ON pics.pic_id = likes.pic_id LEFT JOIN dislikes ON pics.pic_id = dislikes.pic_id WHERE likes.user_id IS NULL AND dislikes.user_id IS NULL AND pics.user_id != $1 ORDER BY pic_score DESC LIMIT 1",
      [req.user]
    );

    const toReturn = {
      inQueue: JSON.stringify(inQueue.rows),
      user_name: `${user.rows[0].user_name}`,
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
  }
});

//next photo route (trivial)
router.get("/nextPhoto", authorization, async (req, res) => {
  // query all photos in "pic" table that do not belong to user and are not in "like" or "dislike"
  try {
    // const reqBody = req.body; --> I had to do this without authorization. This could only be done when adding token into the headers upon fetch.

    const inQueue = await pool.query(
      "SELECT pics.pic_id FROM pics LEFT JOIN likes ON pics.pic_id = likes.pic_id LEFT JOIN dislikes ON pics.pic_id = dislikes.pic_id WHERE likes.user_id IS NULL AND dislikes.user_id IS NULL AND pics.user_id != $1 ORDER BY pic_score DESC LIMIT 1",
      [req.user]
    );

    const toReturn = {
      nextPic: JSON.stringify(inQueue.rows),
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
  }
});

//like route
router.post("/like", authorization, async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.headers.pic_id);

    const like_pic = await pool.query(
      "INSERT INTO likes (user_id, pic_id) VALUES ($1, $2) RETURNING *",
      [req.user, req.headers.pic_id]
    );
    await pool.query("UPDATE pics SET pic_score = pic_score - 1 WHERE pic_id = $1", [req.headers.pic_id]);
    res.json("liked a photo!");
  } catch (err) {
    console.error(err.message);
  }
});

//dislike route
router.post("/dislike", authorization, async (req, res) => {
  try {
    const dislike_pic = await pool.query(
      "INSERT INTO dislikes (user_id, pic_id) VALUES ($1, $2) RETURNING *",
      [req.user, req.headers.pic_id]
    );
    await pool.query("UPDATE pics SET pic_score = pic_score - 1 WHERE pic_id = $1", [req.headers.pic_id]);
    res.json("disliked a photo!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
