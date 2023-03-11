"use-strict";

require("dotenv").config()

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(express.static("assets"));
app.use("/static", express.static(path.join(__dirname, "/assets")));
app.use(express.static("dist"));
app.use("/static/js", express.static(path.join(__dirname, "/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
  console.log(`App up and runing on PORT ${PORT}`);
});