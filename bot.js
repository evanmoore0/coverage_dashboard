const puppeteer = require("puppeteer");
const UserAgent = require('user-agents');

const bot = async (comp) => {
  //     console.log("IN BOt")
  //   const browser = await puppeteer.launch({
  //     headless: true,
  //     args: [
  //       "--no-sandbox",
  //       "--disable-setuid-sandbox",
  //     ],
  //   });

  //   console.log("AFTer launch")

  //   try {

  //     console.log("New page")
  //     const page = await browser.newPage();

  //     console.log("got to")
  //     await page.goto(comp.link);

  //     // await page.waitForXPath('//*[@id="EmpStats"]/div/div[1]/div/div/div')
  //     console.log("PAGE X")

  //     const [getXpath] = await page.$x('//*[@id="EmpStats"]/div/div[1]/div/div/div')

  //     console.log("RESULTS " + getXpath)

  //     // console.log("RESULT")
  //     const rating = await page.evaluate(el => el.innerText, getXpath)

  //     console.log(`Rating for ${comp.company} is ${rating}`)

  //   } catch (error) {

  //     console.log("ERROR")
  //     console.log(error)
  //     return {Company: comp.company, Rating: "N/A (Error"}

  //   } finally {
  //     console.log("CLOSE")
  //     await browser.close();
  //   }

  //   return {Company: comp.company, Rating: rating}

//   console.log("IN BOt");

const userAgent = new UserAgent();


  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox",
    '--user-agent=' + userAgent + ""
],
  });

  console.log("AFTer launch");
  let rating = "N/A";

  try {
    console.log("New page");
    const page = await browser.newPage()

    // await page.setUserAgent('--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"')

    // await page.setViewport({'width': 1920, 'height': 1080})

    console.log("got to");
    await page.goto("https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm", {
        waitUntil: 'domcontentloaded',
        timeout: 0});

    
    const [getXpath] = await page.$x('//*[@id="EmpStats"]/div/div[1]/div/div/div')

    console.log("RESULTS " + getXpath)

    rating = await page.evaluate(el => el.innerText, getXpath)

    // Get Ratin

  } catch (error) {
    console.log("ERROR");
    console.log(error);
    return { Company: comp.company, Rating: "N/A (Error)" };
  } finally {
    console.log("CLOSE");
    await browser.close();
  }

  return { Company: comp.company, Rating: rating };
};

module.exports = bot;
