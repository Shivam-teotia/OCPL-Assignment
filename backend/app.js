const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//import routes
const user = require("./routes/user");
const task = require("./routes/tasks");
//using routes
app.use("/api/v1", user);
app.use("/api/v1", task);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, rest) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
module.exports = app;
