const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

//middleware
app.use(express.json()); //req.body
app.use(cors());
app.use(fileUpload());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
