const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo")
const authorization = require("../middleware/authorization");

//Registering user
router.post("/register", validInfo, async(req, res) => {
  try {

    //1. destructure the req.body (name, email, password)

    const { name, email, password} = req.body;

    //2. check if user exists (if user exist then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists!") //see 401 and 403 codes!  
    } 

    //3. Bcrypt the user password (see npm bcrypt documentation)

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound); //note: await is for async functions

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the new user inside our database

    const newUser = await pool.query(
    "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bcryptPassword]);

    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Login route
router.post("/login", validInfo, async (req, res) => {
  try {

    //1. destructure the req.body
    
    const { email, password } = req.body;

    //2. check if user doesn't exist (if not then we throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");  //Email is wrong
    }

    //3. check if incoming password is the same as the database password
    // note: await bc bcrypt (async)
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password); 

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");  //Password is wrong
    }

    //4. give them the jwt token if passed all test

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

//Private Routes
router.get("/is-verify", authorization, (req, res) => {
  try {
    //Because of timeout may need to relogin to reverify
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;