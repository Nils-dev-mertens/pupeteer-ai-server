import puppeteer from 'puppeteer';
async function fetchpupeteer(id) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bol.com/be/nl/p/keycaps-rood-rode-keycaps-red-keycaps-double-shot-keycaps-pbt-keycaps-double-shot-keycaps-toetsenbord-key-caps/9300000015064182/?bltgh=swaAlhmcIq2R-NbQbp9CfQ.2_18.35.ProductImage');
  await page.setViewport({width: 1080, height: 1024});
  const module = require("./modules/default.js")
  const text = await page.evaluate(() => {
      const whole = document.querySelector('.wholePrice');
      const sub = document.querySelector('.subPrice');
      return module.returnwholeprice(whole, sub);
    });
  console.log('The price is: ' + text);
  await browser.close();
}
fetchpupeteer();