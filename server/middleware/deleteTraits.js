const pool = require("../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTrait = await pool.query(
      "DELETE FROM traits WHERE trait_id = $1",
      [id]
    );

    console.log("should have deleted from DB");
    res.json("Trait was deleted");
  } catch (err) {
    console.error(err.message);
  }
};
