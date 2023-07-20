const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");

const ratings = async (comp) => {
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

const openings = async (comp) => {
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

const news = async (link) => {
  const userAgent = new UserAgent();

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-agent=" + userAgent + "",
    ],
  });

  let final_news = [];

  try {
    const page = await browser.newPage();

    await page.goto(link, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const [getXpath] = await page.$x('//*[@id="rso"]/div/div');

    let news_rep = await page.evaluate((el) => el.innerText, getXpath);

    let new_news = news_rep.split("\n");

    if(new_news[0] == "Sort by date") {
        new_news.shift()
    }

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
  } catch (error) {
    console.log(error);
    return {
      publisher: "N/A",
      headline: "N/A",
      description: "N/A",
      date: "N/A",
    };
  } finally {
    await browser.close();
  }

  return final_news;
};

module.exports = {
  ratings: ratings,
  openings: openings,
  news: news,
};
