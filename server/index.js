const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const { takeScreenshot } = require("./take-screenshot");
const app = express();
const port = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/take-screenshot", (req, res) => {
  takeScreenshot(res);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
