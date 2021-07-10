const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const http = require("http");
const socketio = require("socket.io");
const pool = require("./db");

//App config
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
//const io = socketio(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection Occurred");

  socket.on("join", ({ user_id, group_id }, callback) => {
    //console.log(user_id, group_id);

    socket.join(group_id);

    socket.emit("message", {
      user: user_id,
      text: `${user_id} has joined room ${group_id}`,
    });
    socket.broadcast.to(group_id).emit("message", {
      user: user_id,
      text: `Welcome ${user_id} to ${group_id}`,
    });

    callback();
  });

  socket.on("sendMessage", (message, user_id, group_id, callback) => {
    io.to(group_id).emit("message", { user: user_id, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Disconnection Ocurred");
  });
});

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

//group route
app.use("/group", require("./routes/group"));

app.use("/discover", require("./routes/discover"));

app.use("/profile", require("./routes/profile"));

/*
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
*/

server.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
