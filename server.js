
// Import the functions you need from the SDKs you need



//IMPORTS
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");
const { ratings, news, openings } = require("./bot");
const constants = require("./constants");

const {stockListRef, setDoc, doc, getDocs, listQuery, deleteDoc, db} = require("./firebase");

const PORT = process.env.PORT || 8000;

// Use cors
app.use(cors());

// Connect to build
app.use(express.static(path.join(__dirname, "client/build")));

// Send build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


app.get("/upload-list", async (req, res) => {
  // await setDoc(doc(stockListRef, "Name"), {
  //   tickers: ["CMBM", "ANET"]
  // })
  console.log("In upload list")
  console.log(req.query.tickers.split(","))

  let request = req.query.tickers.split(",")

  let name = request[0]

  request.shift()

  await setDoc(doc(stockListRef, name), {
    tickers: request
  })
})

app.get("/delete-list", async(req, res) => {
  await deleteDoc(doc(db, "stockList", req.query.id))
})

app.get("/get-lists", async(req, res) => {
  const querySnapshot = await getDocs(listQuery)

  let finalList = []
  querySnapshot.forEach((doc) => {
    finalList.push({
      name: doc.id,
      data: doc.data()
    })
  })

  res.json({
    lists: finalList
  })
})


// Glassdoor Point
app.get("/ratings", async (req, res) => {

  let iter = parseInt(req.query.iter)

  let response = await ratings(constants.glassDoor[iter]);

  res.json({
    express: {
      name: response.Company,
      other: response.Rating,
    },
  });
});

app.get("/jobs", async (req, res) => {

  let iter = parseInt(req.query.iter)

  let response = await openings(constants.openings[iter])
  res.json({
    express: {
      name: response.Company,
      other: response.Other
    }
  })
})

app.get("/news", async (req, res) => {

  const newsFirst =`https://www.google.com/search?q=${req.query.search}&tbm=nws&sa=X&ved=2ahUKEwjCpuCdz6CAAxXyM0QIHUWTCCsQ0pQJegQICxAB&biw=619&bih=642&dpr=2.2`

  const newsSecond = `https://www.google.com/search?q=${req.query.search}&tbm=nws&ei=0-e6ZMm7KMjbkPIPzsefmAo&start=10&sa=N&ved=2ahUKEwiJ8ZWfz6CAAxXILUQIHc7jB6MQ8tMDegQIAxAE&biw=619&bih=642&dpr=2.2`

  let links = [newsFirst, newsSecond]

  let response = []
  for (const page of links) {

    let response_news = await news(page, req.query.search)

    response = response.concat(response_news)

  }

  response = response.sort((a,b) => {return b.comp - a.comp})


    res.json({express: response})
});

app.get("/allnews", async (req, res) => {
  const newsLink = `https://www.google.com/search?q=${req.query.search}&tbm=nws&sa=X&ved=2ahUKEwjCpuCdz6CAAxXyM0QIHUWTCCsQ0pQJegQICxAB&biw=619&bih=642&dpr=2.2`
  let response_news = await news(newsLink, req.query.search)
  res.json({
    express: response_news
  })
})

// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
