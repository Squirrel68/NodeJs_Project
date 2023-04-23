const express = require("express");
const app = express();
const config = require("config");
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(config.get("app.static_folder")));
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

//Router
app.use(require(config.get("app.router")));

module.exports = app;
