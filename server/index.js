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
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection Occurred");

  socket.on("join", ({ user_id, group_id, user_name, group_name }, callback) => {

    socket.join(group_id);

    socket.emit("message", {
      user_id: user_id,
      user_name: user_name,
      text: `You have joined ${group_name}`,
    });
    socket.broadcast.to(group_id).emit("message", {
      user_id: user_id,
      user_name: user_name,
      text: `${user_name} has joined ${group_name}`,
    });

    callback();
  });

  socket.on("sendMessage", (message, user_id, group_id, user_name, callback) => {
    io.to(group_id).emit("message", { user_id: user_id, user_name: user_name, text: message });
    pool.query(
      "INSERT INTO group_chat_history(group_id, user_id, message_contents) \
      VALUES ($1, $2, $3)",
      [group_id,user_id,message]
    )
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Disconnection Occured")
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
