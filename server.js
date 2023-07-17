const express = require("express"); //Line 1
const app = express(); //Line 2
const port =  8000; //Line 3

// import { jobLinks, glassDoorLinks, capabilities, gridUrl } from "./constants";

const glassDoorLinks = {
  ANET: "https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm",
  AVNW: "https://www.glassdoor.com/Reviews/Aviat-Networks-Reviews-E304176.htm",
  // AXON: "https://www.glassdoor.com/Reviews/Axon-Reviews-E1597674.htm",
  // BLZE: "https://www.glassdoor.com/Reviews/Backblaze-Reviews-E1197085.htm",
  // BOX: "https://www.glassdoor.com/Reviews/Box-Reviews-E254092.htm",
  // CMBM: "https://www.glassdoor.com/Reviews/Cambium-Networks-Reviews-E466115.htm",
  // CSCO: "https://www.glassdoor.com/Reviews/Cisco-Systems-Reviews-E1425.htm",
  // DT: "https://www.glassdoor.com/Reviews/Dynatrace-Reviews-E309684.htm",
  // NEWR: "https://www.glassdoor.com/Reviews/New-Relic-Reviews-E461657.htm",
  // NTNX: "https://www.glassdoor.com/Reviews/Nutanix-Reviews-E429159.htm",
  // OOMA: "https://www.glassdoor.com/Reviews/ooma-Reviews-E273768.htm",
  // RBBN: "https://www.glassdoor.com/Reviews/Ribbon-Communications-Reviews-E2590888.htm",
  // SWI: "https://www.glassdoor.com/Reviews/SolarWinds-Reviews-E100286.htm",
  // SSTI: "https://www.glassdoor.com/Reviews/SoundThinking-Reviews-E366121.htm",
  // VRNS: "https://www.glassdoor.com/Reviews/Varonis-Systems-Reviews-E300225.htm",
};

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
  // {
  //   ticker: "BLZE", // Not done
  //   link: "https://backblaze.hrmdirect.com/employment/job-openings.php?search=true&dept=-1",
  //   xpath: "",
  //   ready: false
  // },
  // {
  //   ticker: "BOX", // Good, First
  //   link: "https://box.eightfold.ai/careers?location=United%20States&domain=box.com",
  //   xpath: "//*[@id='pcs-body-container']/div[2]/div[1]/div/span/span/strong",
  //   ready: true
  // },
  // {
  //   ticker: "CMBM", // Not done
  //   link: "https://www.cambiumnetworks.com/about-cambium/careers/",
  //   xpath: "",
  //   ready: false
  // },
  // {
  //   ticker: "CSCO", // Good, Last
  //   link: "https://jobs.cisco.com/jobs/SearchJobs/?listFilterMode=1",
  //   xpath: "//*[@id='content']/div/div[2]/div[1]/div/span",
  //   ready: true
  // },
  // {
  //   ticker: "DT", // Good, Last,
  //   link: "https://careers.dynatrace.com/jobs/",
  //   xpath: "//*[@id='content']/section[1]/div[3]/section/form/div[3]/aside/div[2]/div[2]/p/span",
  //   ready: true
  // },
  // {
  //   ticker: "NEWR", // Good, Last
  //   link: "https://newrelic.careers/en_US/careers",
  //   xpath: "//*[@id='main']/div/div/section/div[3]/div[1]/div[1]/div[1]",
  //   ready: true
  // },
  // {
  //   ticker: "NTNX", // Not done
  //   link: "https://nutanix.eightfold.ai/careers?&domain=nutanix.com",
  //   xpath: "//*[@id='target_anchor_']/div/span/div/div/span/div/div/strong",
  //   ready: false
  // },
  // {
  //   ticker: "OOMA", // Not done
  //   link: "https://boards.greenhouse.io/ooma",
  //   xpath: "",
  //   ready: false
  // },
  // {
  //   ticker: "RBBN", // Good, first
  //   link: "https://vhr-genband.wd1.myworkdayjobs.com/ribboncareers",
  //   xpath: "//*[@id='mainContent']/div/div[2]/section/p",
  //   ready: true
  // },
  // {
  //   ticker: "SWI", // Good, Last,
  //   link: "https://jobs.solarwinds.com/jobs/",
  //   xpath: "/html/body/div[7]/div[2]/div/div/p",
  //   ready: true
  // },
  // {
  //   ticker: "SSTI", // Not done
  //   link: "https://www.soundthinking.com/careers/",
  //   xpath: "",
  //   ready: false
  // },
  // {
  //   ticker: "VRNS", // Not done
  //   link: "https://careers.varonis.com/",
  //   xpath: "",
  //   ready: false
  // }
];

const capabilities = {
  browserName: "Chrome",
  browserVersion: "114.0",
  "LT:Options": {
    username: "evan_moore",
    accessKey: "IrB1BMFPs1LKc3sJI7TpnCfkH7rdPyvvhph1goRNRzqMOdGSeP",
    platformName: "Windows 10",
    project: "New Plaz",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const USERNAME = "evan_moore"; //replace with your username
const KEY = "IrB1BMFPs1LKc3sJI7TpnCfkH7rdPyvvhph1goRNRzqMOdGSeP"; //replace with your accesskey
const GRID_HOST = "hub.lambdatest.com/wd/hub";
const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// Glassdoor Point
app.get("/ratings", async (req, res) => {
  const { Builder, By } = require("selenium-webdriver");
  // Import options from chrome
  const chrome = require("selenium-webdriver/chrome");

  let ratings = [];

// change window size of driver

// Convert this code to javascript

// self.chrome_options = webdriver.ChromeOptions()
// self.chrome_options.add_argument("--window-size=1920,1080")
// self.chrome_options.add_argument("--disable-extensions")
// self.chrome_options.add_argument("--proxy-server='direct://'")
// self.chrome_options.add_argument("--proxy-bypass-list=*")
// self.chrome_options.add_argument("--start-maximized")
// self.chrome_options.add_argument('--headless')
// self.chrome_options.add_argument('--disable-gpu')
// self.chrome_options.add_argument('--disable-dev-shm-usage')
// self.chrome_options.add_argument('--no-sandbox')
// self.chrome_options.add_argument('--ignore-certificate-errors')
// self.browser = webdriver.Chrome(options=self.chrome_options)


// Add chrome_options.add_argument('--allow-running-insecure-content')

// Add user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
// options.add_argument(f'user-agent={user_agent}')


  chrome_options = new chrome.Options();
  chrome_options.addArguments("--window-size=1920,1080");
  chrome_options.addArguments("--disable-extensions");
  chrome_options.addArguments("--proxy-server='direct://'");
  chrome_options.addArguments("--proxy-bypass-list=*");
  chrome_options.addArguments("--start-maximized");
  chrome_options.addArguments("--headless");
  chrome_options.addArguments("--disable-gpu");
  chrome_options.addArguments("--disable-dev-shm-usage");
  chrome_options.addArguments("--no-sandbox");
  chrome_options.addArguments("--ignore-certificate-errors");
  chrome_options.addArguments("--allow-running-insecure-content");
  chrome_options.addArguments(
    "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)"
  );
  




  console.log("Starting Glassdoor...");

  for (const key in glassDoorLinks) {
    let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chrome_options)
    .build();

    // Get screenshot

    await driver.takeScreenshot('screenshot.png')

    await driver.get(glassDoorLinks[key]);

    // Wait for the page to load
    // await driver.wait(
    //   until.elementLocated(
    //     By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
    //   ),
    //   10000
    // );



    const rating = await driver
      .findElement(By.xpath('//*[@id="EmpStats"]/div/div[1]/div/div/div'))
      .getText();

    console.log("Push " + key + " to ratings... " + rating);
    ratings.push({ Company: key, Rating: rating });
    await driver.quit();
  }

  console.log("Done with Glassdoor");
  res.send({ express: ratings });
});

app.get("/openings", async (req, res) => {
  const { Builder, By } = require("selenium-webdriver");

  console.log("IN openings");
  let job_openings = [];

  for (const company of jobLinks) {
    console.log(company);

    if (!company["ready"]) {
      console.log("Skipping " + company["ticker"] + "...");
      continue;
    }

    console.log("Starting " + company.ticker + "...");
    let driver = await new Builder()
    .forBrowser("chrome")
    .build();

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

app.get("/news", async (req, res) => {
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
