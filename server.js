//IMPORTS
const express = require("express"); //Line 1
const app = express(); //Line 2
const path = require("path");
var cors = require("cors");

const webdriver = require("selenium-webdriver");

const PORT = process.env.PORT || 8000;

// GLASS DOOR
const glassDoorLinks = [
  {company: "ANET", link: "https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm"},
  {company: "AVNW", link:"https://www.glassdoor.com/Reviews/Aviat-Networks-Reviews-E304176.htm"},
  {company: "AXON", link: "https://www.glassdoor.com/Reviews/Axon-Reviews-E1597674.htm"},
  {company: "BLZE", link: "https://www.glassdoor.com/Reviews/Backblaze-Reviews-E1197085.htm"},
  {company: "BOX" ,link: "https://www.glassdoor.com/Reviews/Box-Reviews-E254092.htm"},
  {company: "CMBM", link: "https://www.glassdoor.com/Reviews/Cambium-Networks-Reviews-E466115.htm"},
  {company: "CSCO", link: "https://www.glassdoor.com/Reviews/Cisco-Systems-Reviews-E1425.htm"},
  {company: "DT" , link: "https://www.glassdoor.com/Reviews/Dynatrace-Reviews-E309684.htm"},
  {company: "NEWR", link: "https://www.glassdoor.com/Reviews/New-Relic-Reviews-E461657.htm"},
  {company: "NTNX", link:"https://www.glassdoor.com/Reviews/Nutanix-Reviews-E429159.htm"},
  {company: "OOMA", link:"https://www.glassdoor.com/Reviews/ooma-Reviews-E273768.htm"},
  {company: "RBBN", link:"https://www.glassdoor.com/Reviews/Ribbon-Communications-Reviews-E2590888.htm"},
  {company: "SWI",  link:"https://www.glassdoor.com/Reviews/SolarWinds-Reviews-E100286.htm"},
  {company: "SSTI", link:"https://www.glassdoor.com/Reviews/SoundThinking-Reviews-E366121.htm"},
  {company: "VRNS", link:"https://www.glassdoor.com/Reviews/Varonis-Systems-Reviews-E300225.htm"}
]

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
  {
    ticker: "BLZE", // Not done
    link: "https://backblaze.hrmdirect.com/employment/job-openings.php?search=true&dept=-1",
    xpath: "",
    ready: false,
  },
//   {
//     ticker: "BOX", // Good, First
//     link: "https://box.eightfold.ai/careers?location=United%20States&domain=box.com",
//     xpath: "//*[@id='pcs-body-container']/div[2]/div[1]/div/span/span/strong",
//     ready: true,
//   },
//   {
//     ticker: "CMBM", // Not done
//     link: "https://www.cambiumnetworks.com/about-cambium/careers/",
//     xpath: "",
//     ready: false,
//   },
//   {
//     ticker: "CSCO", // Good, Last
//     link: "https://jobs.cisco.com/jobs/SearchJobs/?listFilterMode=1",
//     xpath: "//*[@id='content']/div/div[2]/div[1]/div/span",
//     ready: true,
//   },
//   {
//     ticker: "DT", // Good, Last,
//     link: "https://careers.dynatrace.com/jobs/",
//     xpath:
//       "//*[@id='content']/section[1]/div[3]/section/form/div[3]/aside/div[2]/div[2]/p/span",
//     ready: true,
//   },
//   {
//     ticker: "NEWR", // Good, Last
//     link: "https://newrelic.careers/en_US/careers",
//     xpath: "//*[@id='main']/div/div/section/div[3]/div[1]/div[1]/div[1]",
//     ready: true,
//   },
//   {
//     ticker: "NTNX", // Not done
//     link: "https://nutanix.eightfold.ai/careers?&domain=nutanix.com",
//     xpath: "//*[@id='target_anchor_']/div/span/div/div/span/div/div/strong",
//     ready: false,
//   },
//   {
//     ticker: "OOMA", // Not done
//     link: "https://boards.greenhouse.io/ooma",
//     xpath: "",
//     ready: false,
//   },
//   {
//     ticker: "RBBN", // Good, first
//     link: "https://vhr-genband.wd1.myworkdayjobs.com/ribboncareers",
//     xpath: "//*[@id='mainContent']/div/div[2]/section/p",
//     ready: true,
//   },
//   {
//     ticker: "SWI", // Good, Last,
//     link: "https://jobs.solarwinds.com/jobs/",
//     xpath: "/html/body/div[7]/div[2]/div/div/p",
//     ready: true,
//   },
//   {
//     ticker: "SSTI", // Not done
//     link: "https://www.soundthinking.com/careers/",
//     xpath: "",
//     ready: false,
//   },
//   {
//     ticker: "VRNS", // Not done
//     link: "https://careers.varonis.com/",
//     xpath: "",
//     ready: false,
//   },
];

const newsLinks = [
    "https://www.google.com/search?q=shot+spotter&tbm=nws&ei=nH6xZMHiDp34kPIPkr-RkAs&start=0&sa=N&ved=2ahUKEwjBoK7R1Y6AAxUdPEQIHZJfBLI4ChDy0wN6BAgEEAQ&biw=1102&bih=642&dpr=2.2",
  "https://www.google.com/search?q=shot+spotter&tbm=nws&ei=Xqa2ZIiGOIz4kPIPpeq38AM&start=10&sa=N&ved=2ahUKEwiIrfegwJiAAxUMPEQIHSX1DT4Q8tMDegQIBBAE&biw=1200&bih=656&dpr=2",
];

// Use cors
app.use(cors());

// Connect to build
app.use(express.static(path.join(__dirname, "client/build")));

// Send build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Test
app.get("/api/test", (req, res) => {
  console.log("HERER");
  res.json({ test: "Hello World!" });
});

// Lambda stuff
const capability = {
  browserName: "Chrome",
  browserVersion: "114.0",
  "LT:Options": {
    username: "evan.more02",
    accessKey: "bfxWGbJzwT4HJnORzMI6oyAKeopHJnsAZrwO5SRbDqb5TkEbTr",
    platformName: "Windows 10",
    build: "Heroku",
    project: "JMP",
    w3c: true,
    plugin: "node_js-node_js",
  },
};
const USERNAME = "evan.more02"; //replace with your username
const KEY = "bfxWGbJzwT4HJnORzMI6oyAKeopHJnsAZrwO5SRbDqb5TkEbTr"; //replace with your accesskey
const GRID_HOST = "hub.lambdatest.com/wd/hub";
const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

// Glassdoor Point
app.get("/api/ratingsone", async (req, res) => {
  console.log("Starting Glassdoor...");

  let ratings = [];

  // Loop through each company
  for (const key of glassDoorLinks.slice(0,2)) {
    let driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capability)
        .build();
    //   .forBrowser("chrome")
    //   .build();

    // Get the link
    await driver.get(key.link);

    const rating = await driver
      .findElement(
        webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
      )
      .getText();

    console.log("Push " + key.company + " to ratings... " + rating);
    ratings.push({ Company: key.company, Rating: rating });
    await driver.quit();
  }

  console.log("Done with Glassdoor");
  res.json({ express: ratings });
});


// Glassdoor Point
app.get("/api/ratingstwo", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(2,4)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
        // .forBrowser("chrome")
        // .build();
  
      // Get the link
      await driver.get(key.link);
  
      // Get ratings
      // await driver.wait(
      //     webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')),
      //     100000
      //   );
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });

  // Glassdoor Point
app.get("/api/ratingsthree", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(4, 6)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
        // .forBrowser("chrome")
        // .build();
  
      // Get the link
      await driver.get(key.link);
  
      // Get ratings
      // await driver.wait(
      //     webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')),
      //     100000
      //   );
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key.company + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });
  
  // Glassdoor Point
app.get("/api/ratingsfour", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(6,8)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
        // .forBrowser("chrome")
        // .build();
  
      // Get the link
      await driver.get(key.link);
  
      // Get ratings
      // await driver.wait(
      //     webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')),
      //     100000
      //   );
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key.company + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });

  // Glassdoor Point
app.get("/api/ratingsfive", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(8,10)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
      //   .forBrowser("chrome")
      //   .build();
  
      // Get the link
      await driver.get(key.link);
  
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key.company + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });

  // Glassdoor Point
app.get("/api/ratingssix", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(10,12)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
      //   .forBrowser("chrome")
      //   .build();
  
      // Get the link
      await driver.get(key.link);
  
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key.company + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });

  // Glassdoor Point
app.get("/api/ratingsseven", async (req, res) => {
    console.log("Starting Glassdoor...");
  
    let ratings = [];
  
    // Loop through each company
    for (const key of glassDoorLinks.slice(12,14)) {
      let driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capability)
          .build();
      //   .forBrowser("chrome")
      //   .build();
  
      // Get the link
      await driver.get(key.link);
  
      const rating = await driver
        .findElement(
          webdriver.By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
        )
        .getText();
  
      console.log("Push " + key.company + " to ratings... " + rating);
      ratings.push({ Company: key.company, Rating: rating });
      await driver.quit();
    }
  
    console.log("Done with Glassdoor");
    res.json({ express: ratings });
  });

// Job Openings Point
app.get("/api/openings", async (req, res) => {

  console.log("Starting Job Openings...");

  let job_openings = [];

  // Loop through each company
  for (const company of jobLinks) {
    // Skip if not ready
    if (!company["ready"]) {
      console.log("Skipping " + company["ticker"] + "...");
      continue;
    }

    // Create driver
    let driver = await new webdriver.Builder()
      .usingServer(gridUrl)
      .withCapabilities(capability)
      .build();
    // .forBrowser("chrome")
    // .build();

    // Get the link
    await driver.get(company["link"]);

    // Special case for CSCO
    if (company["ticker"] === "CSCO") {
      const csco_openings = await driver
        .findElement(webdriver.By.xpath, "//*[@id='js-calculateTotal']")
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
    await driver.wait(
      webdriver.until.elementLocated(webdriver.By.xpath(company["xpath"])),
      100000
    );
    const openings = await driver
      .findElement(webdriver.By.xpath(company["xpath"]))
      .getText();

    console.log("Openings for " + company["ticker"] + ": " + openings);
    job_openings.push({ Company: company["ticker"], Openings: openings });

    await driver.quit();
  }
  res.json({ express: job_openings });
});



app.get("/api/news", async (req, res) => {

  console.log("Starting News...");

  let final_news = [];

  for (const link in newsLinks) {
    let driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capability)
        .build();
    // .forBrowser("chrome")
    // .build();

    await driver.get(newsLinks[link]);

    const news = await driver
      .findElement(webdriver.By.xpath('//*[@id="rso"]/div/div'))
      .getText();

    var new_news = news.split("\n");

    let count = 3;
    for (let i = 0; i < new_news.length; i++) {
      if (i == count) {
        count += 5;
        continue;
      } else if (i % 5 == 0) {
        final_news.push({
          publisher: new_news[i],
          headline: new_news[i + 1],
          description: new_news[i + 2],
          date: new_news[i + 4],
        });
      }
    }

    await driver.quit();
  }
  res.json({ express: final_news });
});

// Listen to specific port
app.listen(PORT, (err) => {
  if (err) console.info(`Error: The server failed to start on ${PORT}`);
  else console.info(`****** Node server is running on ${PORT} ******`);
});
