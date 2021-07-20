const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    //Gets first 100 pics which has not been recently processed
    const inQueue = await pool.query(
      "SELECT DISTINCT pics.pic_id, pics.pic_score \
      FROM pics LEFT JOIN likes ON pics.pic_id = likes.pic_id \
      LEFT JOIN dislikes ON pics.pic_id = dislikes.pic_id \
      WHERE likes.user_id IS NULL AND dislikes.user_id IS NULL AND pics.user_id != $1 \
      LIMIT 100",
      [req.user]
    );
    //console.log(inQueue.rows)

    //Gets the user's top 100 preffered tags
    const user_prefered_labels = await pool.query(
      "SELECT labels.label_name, COUNT(*) AS num_occurences \
      FROM likes LEFT JOIN labels ON likes.pic_id = labels.pic_id \
      WHERE user_id = $1 GROUP BY label_name, user_id \
      ORDER BY num_occurences DESC LIMIT 100",
      [req.user]
    );
    //console.log(user_prefered_labels.rows)

    //If do this way the time complexity is very bad (modelled cumulative frequency graph / S shape graph)
    //Hashmap to store key (pic_id) value (final_score)
    var map = {};

    //Update based on pic_score
    await Promise.all(
      inQueue.rows.map(async (pic) => {
        map[pic.pic_id] = 1 * pic.pic_score; //1 value here is the A value in ranking equation
      })
    );

    //Update tag_score
    //Loop through pictures
    await Promise.all(
      inQueue.rows.map(async (pic) => {
        const pic_labels = await pool.query(
          "SELECT label_name FROM labels WHERE pic_id = $1",
          [pic.pic_id]
        );
        //Loop through pictures tags
        await Promise.all(
          pic_labels.rows.map(async (label) => {
            //Check if label exists in user preffered tags
            //Loop through user preffered labels
            user_prefered_labels.rows.forEach((preffered_label) => {
              if (label.label_name == preffered_label.label_name) {
                map[pic.pic_id] += 0.7 * preffered_label.num_occurences; //0.7 value here is the B value in ranking equation
              }
            });
          })
        );
      })
    );

    //Find highest score picture & who posted it
    var temp = [];
    var posted_by = "";
    if (Object.keys(map).length !== 0) {
      const recommended_pic_id = Object.entries(map).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      temp = [{ pic_id: recommended_pic_id }];
      const posted_by_temp = await pool.query(
        "SELECT users.user_name FROM users \
        LEFT JOIN pics ON users.user_id = pics.user_id \
        WHERE pics.pic_id = $1",
        [recommended_pic_id]
      );
      posted_by = posted_by_temp.rows[0].user_name
    }

    //console.log(map);
    //console.log(inQueue.rows);
    //console.log(recommended_pic_id);

    const toReturn = {
      inQueue: JSON.stringify(temp),
      user_name: `${user.rows[0].user_name}`,
      posted_by: posted_by,
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

    //Gets first 100 pics which has not been recently processed
    const inQueue = await pool.query(
      "SELECT DISTINCT pics.pic_id, pics.pic_score \
      FROM pics LEFT JOIN likes ON pics.pic_id = likes.pic_id \
      LEFT JOIN dislikes ON pics.pic_id = dislikes.pic_id \
      WHERE likes.user_id IS NULL AND dislikes.user_id IS NULL AND pics.user_id != $1 \
      LIMIT 100",
      [req.user]
    );
    //console.log(inQueue.rows)

    //Gets the user's top 100 preffered tags
    const user_prefered_labels = await pool.query(
      "SELECT labels.label_name, COUNT(*) AS num_occurences \
      FROM likes LEFT JOIN labels ON likes.pic_id = labels.pic_id \
      WHERE user_id = $1 GROUP BY label_name, user_id \
      ORDER BY num_occurences DESC LIMIT 100",
      [req.user]
    );
    //console.log(user_prefered_labels.rows)

    //If do this way the time complexity is very bad (modelled cumulative frequency graph / S shape graph)
    //Hashmap to store key (pic_id) value (final_score)
    var map = {};

    //Update based on pic_score
    await Promise.all(
      inQueue.rows.map(async (pic) => {
        map[pic.pic_id] = 1 * pic.pic_score; //0.1 value here is the A value in ranking equation
      })
    );

    //Update tag_score
    //Loop through pictures
    await Promise.all(
      inQueue.rows.map(async (pic) => {
        const pic_labels = await pool.query(
          "SELECT label_name FROM labels WHERE pic_id = $1",
          [pic.pic_id]
        );
        //Loop through pictures tags
        await Promise.all(
          pic_labels.rows.map(async (label) => {
            //Check if label exists in user preffered tags
            //Loop through user preffered labels
            user_prefered_labels.rows.forEach((preffered_label) => {
              if (label.label_name == preffered_label.label_name) {
                map[pic.pic_id] += 0.7 * preffered_label.num_occurences; //0.1 value here is the B value in ranking equation
              }
            });
          })
        );
      })
    );

    //Find highest score picture & who posted it
    var temp = [];
    var posted_by = "";
    if (Object.keys(map).length !== 0) {
      const recommended_pic_id = Object.entries(map).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      temp = [{ pic_id: recommended_pic_id }];
      const posted_by_temp = await pool.query(
        "SELECT users.user_name FROM users \
        LEFT JOIN pics ON users.user_id = pics.user_id \
        WHERE pics.pic_id = $1",
        [recommended_pic_id]
      );
      posted_by = posted_by_temp.rows[0].user_name
    }

    //console.log(map);
    //console.log(inQueue.rows);
    //console.log(recommended_pic_id);

    const toReturn = {
      nextPic: JSON.stringify(temp),
      posted_by: posted_by,
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
  }
});

//like route
router.post("/like", authorization, async (req, res) => {
  try {
    //console.log(req.user);
    //console.log(req.headers.pic_id);

    const like_pic = await pool.query(
      "INSERT INTO likes (user_id, pic_id) VALUES ($1, $2) RETURNING *",
      [req.user, req.headers.pic_id]
    );
    await pool.query(
      "UPDATE pics SET pic_score = pic_score + 1 WHERE pic_id = $1",
      [req.headers.pic_id]
    );
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
    await pool.query(
      "UPDATE pics SET pic_score = pic_score - 1 WHERE pic_id = $1",
      [req.headers.pic_id]
    );
    res.json("disliked a photo!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
