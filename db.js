// this is a module which helps organize code into manageable parts.
const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons psql db
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

// or
/*
const devConfig = `postgresql:${process.env.PG_USER}`:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.DATABASE}`;

const pool = new Pool({
  connectionString : process.env.NODE_ENV === "production" ? proConfig : devConfig
});

*/

module.exports = pool;
