"use-strict";

require("dotenv").config()

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("dist"));
app.use("/static", express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app", "index.html"))
})

const { PORT = 3040, DEV_HOST = "localhost" } = process.env || 3040;

app.listen(PORT, DEV_HOST, () => {
  console.log(`App up and runing on PORT http://${DEV_HOST}:${PORT}`);
});