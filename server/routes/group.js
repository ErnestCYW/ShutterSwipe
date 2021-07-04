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
        )
 
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
        function removeAlreadyMember (recommended_group) {
            let temp = true;
            member_groups.rows.forEach(member_group => {
                if (member_group.group_id == recommended_group.group_id) {
                    temp = false;
                }
            });
            return temp;
        }

        const toReturn = {
            member_groups: JSON.stringify(member_groups.rows),
            recommended_groups: JSON.stringify(recommended_groups.rows.filter(removeAlreadyMember)),
        }

        res.json(toReturn);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
});

module.exports = router;