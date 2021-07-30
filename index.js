const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const http = require("http");
const socketio = require("socket.io");
const pool = require("./db");

//App config
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection Occurred");

  socket.on(
    "join",
    ({ user_id, group_id, user_name, group_name }, callback) => {
      socket.join(group_id);

      callback();
    }
  );

  socket.on(
    "sendMessage",
    (message, user_id, group_id, user_name, callback) => {
      io.to(group_id).emit("message", {
        user_id: user_id,
        user_name: user_name,
        text: message,
      });
      pool.query(
        "INSERT INTO group_chat_history(group_id, user_id, message_contents, date_time) \
      VALUES ($1, $2, $3, DEFAULT)",
        [group_id, user_id, message]
      );
      callback();
    }
  );

  socket.on("disconnect", () => {
    console.log("Disconnection Occured");
  });
});

//middleware
app.use(express.json()); //req.body
app.use(cors());
app.use(fileUpload());

// app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));

  //or app.use(express.static("client/build")) or ./client/build
}

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//feed route
app.use("/feed", require("./routes/feed"));

//group route
app.use("/group", require("./routes/group"));

app.use("/discover", require("./routes/discover"));

app.use("/profile", require("./routes/profile"));

//Home route
app.use("/home", require("./routes/home"));

/*
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//change to app ? ? ?
server.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
