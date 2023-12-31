const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");
const moment = require("moment");

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
  let openings = "N/A";

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-agent=" + userAgent + "",
    ],
  });
  try {
    if (comp.ready) {
      console.log("TIcker:");
      console.log(comp.ticker);
      const page = await browser.newPage();

      // const page = await browser.newPage();

      await page.goto(comp.link, {
        waitUntil: "domcontentloaded",
        timeout: 0,
      });

      if (comp.ticker === "ANET") {
        await page.waitForSelector("#smartWidget0");

        let element = await page.$eval(
          "#smartWidget0",
          (el) => el.children
        );
        console.log("CHILDREN");


        // DONE
      } else if (comp.ticker === "BLZE") {
        await page.waitForSelector(
          "body > div.hrmContainer > div.reqResult > table > tbody"
        );

        let element = await page.$eval(
          "body > div.hrmContainer > div.reqResult > table > tbody",
          (el) => el.shadowRoot
        );

        element = element.split("\n");

        openings = element.length;

        // Done
      } else if (comp.ticker === "CMBM") {
        await page.waitForSelector("#lever-jobs-container");

        let element = await page.$eval(
          "#lever-jobs-container",
          (el) => el.innerText
        );

        const occurances = element.match(/LEARN MORE/g);

        console.log("OCJSOJDOFIJSOIJD")
        console.log("CAMBIUM")
        openings = occurances.length;

        console.log("OCCURANCES")
        console.log(occurances)
        console.log(openings)


      } else if (comp.ticker === "AVNW") {
        await page.waitForSelector("#tileCurrentOpenings");

        let element = await page.$eval(
          "#tileCurrentOpenings",
          (el) => el.textContent
        );

        openings = element;
      } else if (comp.ticker === "NTNX") {
        await page.waitForSelector(
          "#target_anchor_ > div > span > div > div > span > div > div > strong"
        );

        let element = await page.$eval(
          "#target_anchor_ > div > span > div > div > span > div > div > strong",
          (el) => el.textContent
        );

        openings = element

        console.log("NTNX ELMENT");
        console.log(element);
      } else if (comp.ticker === "OOMA") {

        await page.waitForSelector(
          "#main"
        )

        let element = await page.$eval(
          "#main", (el) => el.textContent
        )

        console.log("ELEMENT TEXT")
        console.log(element)

      } else if (comp.ticker === "RBBN") {

       

        await page.waitForSelector(
          "#mainContent > div > div.css-uvpbop > section > p"
        )

        let element = await page.$eval(
          "#mainContent > div > div.css-uvpbop > section > p", (el) => el.textContent
        )

        console.log(element)
        openings = element

      } else if (comp.ticker === "SSTI") {
        // await page.waitForSelector(
        //   "#jobs-list"
        // )

        let element = await page.$eval(
          '#jobs-list', (el) => el.textContent
        )
        console.log("STI ELEMENT")
        console.log(element)
        // openings = element
      } else {
        const [getXpath] = await page.$x(comp.xpath);

        openings = await page.evaluate((el) => el?.innerText, getXpath);
      }
    }
  } catch (error) {
    console.log(error);
    return { Company: comp.ticker, Other: "N/A" };
  } finally {
    await browser.close();
  }

  console.log("COMPANY FINAL");
  console.log(comp.ticker);
  console.log(openings);
  return { Company: comp.ticker, Other: openings };
};

const news = async (link, company) => {
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

    const hrefs = await page.$$eval("a", (as) => as.map((a) => a.href));

    const final_links = hrefs.filter(
      (item) => item.trim() !== "" && !item.includes("google.com")
    );

    let news_rep = await page.evaluate((el) => el.innerText, getXpath);

    // Get news links using puppeteer

    let new_news = news_rep.split("\n");

    if (new_news[0] == "Sort by date") {
      new_news.shift();
    }

    let count = 3;
    let otherCount = 0;
    for (let i = 0; i < new_news.length; i++) {
      if (i == count) {
        count += 5;
        otherCount += 1;
        continue;
      } else if (i % 5 == 0) {
        let comp = new_news[i + 4];
        let d = new_news[i + 4]?.split(" ");

        let now = moment();

        if (d.includes("month") || d.includes("months")) {
          comp = now.subtract(parseInt(d[0]), "M").unix();
        } else if (d.includes("day") || d.includes("days")) {
          comp = now.subtract(parseInt(d[0]), "d").unix();
        } else if (d.includes("hour") || d.includes("hours")) {
          comp = now.subtract(parseInt(d[0]), "h").unix();
        } else if (d.includes("mins") || d.includes("min")) {
          comp = now.subtract(parseInt(d[0]), "s").unix();
        } else if (d.includes("weeks") || d.includes("week")) {
          comp = now.subtract(parseInt(d[0]) * 7, "d").unix();
        } else {
          let test = new Date(new_news[i + 4]);
          comp = moment(test).unix();
        }

        final_news.push({
          publisher: new_news[i],
          headline: new_news[i + 1],
          description: new_news[i + 2],
          date: new_news[i + 4],
          comp: comp,
          link: final_links[otherCount],
          company: company,
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
