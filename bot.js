const puppeteer = require("puppeteer");

const bot = async (comp) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto(comp.link, {
        waitUntil: "networkidle2",
    });

    let result = await page.$x('//*[@id="EmpStats"]/div/div[1]/div/div/div')

    let rating = await page.evaluate(el => el.textContent, result[0])

    console.log(`Rating for ${comp.company} is ${rating}`)
    
  } catch (error) {

    console.log("ERROR")
    return 'Error'
    
  } finally {
    await browser.close();
  }

  return {Company: comp.company, Rating: rating}
};


module.exports = bot;