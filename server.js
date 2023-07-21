//IMPORTS
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");
const {ratings, news, openings} = require("./bot");
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


  console.log(constants.glassDoor[count])
  let response = await ratings(constants.glassDoor[count])
  count = count + 1


  
  res.json({express: {
    name: response.Company,
    other: response.Rating
  }})

});

app.get("/news", async (req, res) => {

  let response = []
  for (const page of constants.news) {

    console.log("PAGE")
    console.log(page)
    let response_news = await news(page)

    response = response.concat(response_news)

  }
    console.log("FINAL RESPONSE")
    console.log(response)
    res.json({express: response}) 
  
});


// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
