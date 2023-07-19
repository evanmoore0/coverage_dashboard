//IMPORTS
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");
const bot = require("./bot");
const constants = require("./constants");


const PORT = process.env.PORT || 8000;

let count = 0

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

  count = count + 1

  console.log(constants.glassDoor[count])
  let response = await bot(constants.glassDoor[count])


  
  res.json({express: {
    Company: response.Company,
    Rating: response.Rating
  }})

});


// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
