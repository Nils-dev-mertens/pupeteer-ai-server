import puppeteer from 'puppeteer';

export async function fetchPuppeteer(ModuleString, link, WholePrice, SubPrice) {
  try {
    // Dynamically import the module
    const PriceModule = await (import(`./modules/${ModuleString}`));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link);
    await page.setViewport({ width: 1080, height: 1024 });

    // Extract prices in the browser context
    const { whole, sub } = await page.evaluate((WholePriceSelector, SubPriceSelector) => {
      const whole = document.querySelector(WholePriceSelector)?.innerText;
      const sub = document.querySelector(SubPriceSelector)?.innerText;
      return { whole, sub };
    }, WholePrice, SubPrice); // Pass selectors as arguments
    if (typeof PriceModule.default === 'function') {
      const result = await PriceModule.default(whole, sub); // Call the default export
      console.log(result);
    } else {
      console.error('The imported module does not have a default export or expected function.');
    }

    await browser.close();
  } catch (error) {
    console.log(`Error fetching Puppeteer module or webpage! Error: ${error.message}`);
  }
}

// Example usage
// fetchPuppeteer(
//   "amazon.js",
//   "https://www.amazon.com.be/gp/product/B0BN1MFHMW/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1",
//   ".a-price-whole",
//   ".a-price-fraction"
// );
