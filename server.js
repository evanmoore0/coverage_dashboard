//IMPORTS
console.log("HIII ");
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");

const PORT = process.env.PORT || 8000;

// GLASS DOOR
const glassDoorLinks = {
  ANET: "https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm",
  AVNW: "https://www.glassdoor.com/Reviews/Aviat-Networks-Reviews-E304176.htm",
};

// JOB OPENINGS
const jobLinks = [
  {
    ticker: "ANET", // Not done
    link: "",
    xpath: "",
    ready: false,
  },
  {
    ticker: "AVNW", // Good, Last
    link: "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=0ec0c5a4-f3ba-4be4-be2b-5d725d77f8ed&ccId=19000101_000001&type=MP&lang=en_US",
    xpath: "//*[@id='tileCurrentOpenings']",
    ready: true,
  },
  {
    ticker: "AXON", // Good, First
    link: "https://www.axon.com/careers/board",
    xpath: "//*[@id='__next']/main/div[1]/div[5]/div[2]/div[2]/div/div[1]/div",
    ready: true,
  },
];

// // Cors
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// var cors = require('cors')

// app.use(cors());
app.use(cors());

// Connect to build
app.use(express.static(path.join(__dirname, "client/build")));

// Send build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

console.log("HERE ");
console.log("LISTNEING ON PORT " + PORT);

app.get("/api/test", (req, res) => {
  console.log("HERER");
  res.json({ test: "Hello World!" });
});

// Glassdoor Point
app.get("/api/ratings", async (req, res) => {
  console.log("IN Glassdoor");

  // // Import selenium
  console.log("REAUIRE");
  const webdriver = require("selenium-webdriver");

  //     // Import chrome
  //   const chrome = require("selenium-webdriver/chrome");

  //     // Import chrome option

  console.log("INIT DRIVER");
  var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

  console.log("GET LINK");
  await driver.get(
    "https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm"
  );

  console.log("GET RATING");
  const rating = await driver
    .findElement(By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div'))
    .getText();
  //     // Store ratings
  //   let ratings = [];

  //   // Chrome options
  //   chrome_options = new chrome.Options();
  //   chrome_options.addArguments("--window-size=1920,1080");
  //   chrome_options.addArguments("--disable-extensions");
  //   chrome_options.addArguments("--proxy-server='direct://'");
  //   chrome_options.addArguments("--proxy-bypass-list=*");
  //   chrome_options.addArguments("--start-maximized");
  //   chrome_options.addArguments("--headless");
  //   chrome_options.addArguments("--disable-gpu");
  //   chrome_options.addArguments("--disable-dev-shm-usage");
  //   chrome_options.addArguments("--no-sandbox");
  //   chrome_options.addArguments("--ignore-certificate-errors");
  //   chrome_options.addArguments("--allow-running-insecure-content");
  //   chrome_options.addArguments(
  //     "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)"
  //   );

  //   console.log("Starting Glassdoor...");

  //  // Loop through each company
  //   for (const key in glassDoorLinks) {
  //     let driver = await new Builder()
  //       .forBrowser("chrome")
  //       .setChromeOptions(chrome_options)
  //       .build();

  //       // Get the link
  //     await driver.get(glassDoorLinks[key]);

  //     // Get ratings
  //     const rating = await driver
  //       .findElement(By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div'))
  //       .getText();

  //     console.log("Push " + key + " to ratings... " + rating);
  //     ratings.push({ Company: key, Rating: rating });
  //     await driver.quit();

  //   }

  ratings = [
    { Company: "Hi", Ratings: 1 },
    { Company: "By", Rating: 2 },
  ];

  console.log("Done with Glassdoor");
  res.json({ express: ratings });
  //   res.send({ express: ratings });
});

// Job Openings Point
app.get("/api/openings", async (req, res) => {
  // Import selenium
  const { Builder, By } = require("selenium-webdriver");

  console.log("Starting Job Openings...");

  // store openings
  let job_openings = [];

  // Loop through each company
  for (const company of jobLinks) {
    console.log(company);

    // Skip if not ready
    if (!company["ready"]) {
      console.log("Skipping " + company["ticker"] + "...");
      continue;
    }

    console.log("Starting " + company.ticker + "...");

    let driver = await new Builder().forBrowser("chrome").build();

    console.log("getting link ");

    await driver.get(company["link"]);

    if (company["ticker"] === "CSCO") {
      const csco_openings = await driver
        .findElement(By.xpath, "//*[@id='js-calculateTotal']")
        .click();

      console.log("Opening for CSCO : " + csco_openings);

      job_openings.push({
        Company: company["ticker"],
        Openings: csco_openings,
      });

      await driver.quit();

      continue;
    }

    // Wait for the page to load
    await driver.wait(until.elementLocated(By.xpath(company["xpath"])), 10000);
    const openings = await driver
      .findElement(By.xpath(company["xpath"]))
      .getText();

    console.log("Openings for " + company["ticker"] + ": " + openings);
    job_openings.push({ Company: company["ticker"], Openings: openings });

    await driver.quit();
  }
  res.send({ express: job_openings });
});

app.get("/api/news", async (req, res) => {
  const { Builder, By } = require("selenium-webdriver");

  let driver = await new Builder()
    // .usingServer(gridUrl)
    // .withCapabilities(capabilities)
    .forBrowser("chrome")
    .build();

  await driver.get(
    "https://www.google.com/search?q=shot+spotter&tbm=nws&ei=nH6xZMHiDp34kPIPkr-RkAs&start=0&sa=N&ved=2ahUKEwjBoK7R1Y6AAxUdPEQIHZJfBLI4ChDy0wN6BAgEEAQ&biw=1102&bih=642&dpr=2.2"
  );

  // Wait for the page to load
  // await driver.wait(
  //   until.elementLocated(
  //     By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
  //   ),
  //   10000
  // );

  const news = await driver
    .findElement(By.xpath('//*[@id="rso"]/div/div'))
    .getText();

  // Split the news into an array of objects with title, source, time

  // Structure of news:

  //Houston police should drop the ShotSpotter program (Editorial)
  // The use of ShotSpotter technology by the Houston Police Department is contributing to longer police response times to violent crime.
  //.
  //7 hours ago

  const newsArray = news.split("\n");

  let newsObjects = [];

  for (let i = 0; i < newsArray.length; i += 4) {
    newsObjects.push({
      title: newsArray[i],
      source: newsArray[i + 1],
      time: newsArray[i + 2],
    });
  }

  console.log(newsObjects);

  res.send({ express: "hi" });
});

// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
