const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const member_groups = await pool.query(
      "SELECT groups.group_name, groups.group_id FROM groups LEFT JOIN group_relations \
            ON groups.group_id = group_relations.group_id \
            WHERE user_id = $1",
      [req.user]
    );

    const recommended_groups = await pool.query(
      "SELECT DISTINCT group_traits.group_id, groups.group_name FROM group_traits \
            LEFT JOIN traits ON group_traits.trait_name = traits.trait_name \
            LEFT JOIN groups ON groups.group_id = group_traits.group_id \
            WHERE traits.user_id = $1",
      [req.user]
    );

    /*
        //Cannot use async?
        const filtered_recommended_groups = [];
        await Promise.all(
            member_groups.rows.map(async (member_group) => {
                await Promise.all (
                    recommended_groups.rows.map(async (recommended_group) => {
                        if (recommended_group.group_id !== member_group.group_id) {
                            filtered_recommended_groups.push(recommended_group);
                        } 
                    })
                )          

            })
        )
        */

    //Remove groups user is already part of
    function removeAlreadyMember(recommended_group) {
      let temp = true;
      member_groups.rows.forEach((member_group) => {
        if (member_group.group_id == recommended_group.group_id) {
          temp = false;
        }
      });
      return temp;
    }

    const toReturn = {
      member_groups: JSON.stringify(member_groups.rows),
      recommended_groups: JSON.stringify(
        recommended_groups.rows.filter(removeAlreadyMember)
      ),
      user_id: req.user,
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/create", authorization, async (req, res) => {
  try {
    // Front end will send a post request with formData
    const form = req.body;
    console.log(form);
    console.log(req.user);
    // const group_name = form.group_name;
    // const group_trait = form.group_trait;

    // This will take the headers and insert into the database

    const addGroup = await pool.query(
      "INSERT INTO groups (group_id, group_name) \
      VALUES (DEFAULT, $1) RETURNING group_id",
      [req.body.group_name]
    );

    const currGroupId = addGroup.rows[0].group_id;

    const addGroupRelation = await pool.query(
      "INSERT INTO group_relations (group_id, user_id) \
        VALUES ($1, $2)",
      [currGroupId, req.user]
    );

    const addGroupTraits = await pool.query(
      "INSERT INTO group_traits (group_id, trait_name) \
        VALUES ($1, $2)",
      [currGroupId, form.group_trait]
    );

    console.log(currGroupId);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/leave/:group_id", authorization, async (req, res) => {
  try {
    const { group_id } = req.params;
    console.log(group_id); // ":group_id" must be included in the route - why?
    console.log(req.user);

    const leaveGroup = await pool.query(
      "DELETE FROM group_relations WHERE group_id = $1 AND user_id = $2",
      [group_id, req.user]
    );

    res.json("User left group");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/delete/:group_id", authorization, async (req, res) => {
  try {
    const { group_id } = req.params;

    const deleteAllRelation = await pool.query(
      "DELETE FROM group_relations WHERE group_id = $1",
      [group_id]
    );

    const deleteAllTraits = await pool.query(
      "DELETE FROM group_traits WHERE group_id = $1",
      [group_id]
    );

    const deleteGroup = await pool.query(
      "DELETE FROM groups WHERE group_id = $1",
      [group_id]
    );

    res.json("Group Deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
