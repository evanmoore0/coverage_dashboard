const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");

const bot = async (comp) => {
  const userAgent = new UserAgent();

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-agent=" + userAgent + "",
    ],
  });

  let rating = "N/A";

  try {
    const page = await browser.newPage();

    await page.goto(comp.link, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const [getXpath] = await page.$x(
      '//*[@id="EmpStats"]/div/div[1]/div/div/div'
    );

    rating = await page.evaluate((el) => el.innerText, getXpath);

  } catch (error) {
    console.log(error);
    return { Company: comp.company, Rating: "N/A (Error)" };
  } finally {
    await browser.close();
  }

  return { Company: comp.company, Rating: rating };
};

module.exports = bot;
