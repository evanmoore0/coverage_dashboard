//IMPORTS
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");

const bot = require("./bot");

var pupeeteer = require("puppeteer");

// const webdriver = require("selenium-webdriver");

const PORT = process.env.PORT || 8000;


// Use cors
app.use(cors());

// Connect to build
app.use(express.static(path.join(__dirname, "client/build")));

// Send build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Glassdoor Point
app.get("/ratings", async (req, res) => {

  const response = await bot()
  res.send(response)

});


// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
