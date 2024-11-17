import puppeteer from 'puppeteer';
import express from "express";
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.bol.com/be/nl/p/keycaps-rood-rode-keycaps-red-keycaps-double-shot-keycaps-pbt-keycaps-double-shot-keycaps-toetsenbord-key-caps/9300000015064182/?bltgh=swaAlhmcIq2R-NbQbp9CfQ.2_18.35.ProductImage');
    await page.setViewport({width: 1080, height: 1024});
    const text = await page.evaluate(() => {
        const element = document.querySelector('.promo-price'); // Use querySelector
        return element ? element.textContent : null;  // Safely handle null
      });
    console.log(text);
    await browser.close();
})();