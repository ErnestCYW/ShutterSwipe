const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//App config
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json()); //req.body
app.use(cors());
app.use(fileUpload());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//feed route
app.use("/feed", require("./routes/feed"));

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
