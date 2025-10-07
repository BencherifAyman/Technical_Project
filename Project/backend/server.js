require("./config/config");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./db");

const app = express();


db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*"} 
});


app.use((req, _res, next) => {
  req.io = io;
  next();
});


io.on("connection", (socket) => {
  console.log("📡 socket connected:", socket.id);
  socket.on("disconnect", () => console.log("❌ socket disconnected:", socket.id));
});


require("./routes")(app);


app.on("ready", () => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log("Server is up on port", PORT);
  });
});
module.exports = app;