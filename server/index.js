const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const { takeScreenshot } = require("./take-screenshot");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");


app.use(express.json());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://www.snapshotyourwebsite.com" : "http://localhost:3000",
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/take-screenshot", (req, res) => {
  takeScreenshot(req,res);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
