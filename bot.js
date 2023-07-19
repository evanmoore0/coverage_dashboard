const puppeteer = require("puppeteer");

const bot = async () => {
    console.log("HI BOT")
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm", {
        waitUntil: "networkidle2",
    });
    
  } catch (error) {

    console.log("ERROR")
    return 'Error'
    
  } finally {
    await browser.close();
  }

  return 'Done'
};


module.exports = bot;