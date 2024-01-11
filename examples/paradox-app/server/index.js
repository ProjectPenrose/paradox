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

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
  console.log(`App up and runing on PORT http://127.0.0.1:${PORT}`);
});