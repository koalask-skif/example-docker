const puppeteer = require('puppeteer');
require('dotenv').config();

module.exports = { puppieLogic };

async function puppieLogic(res) {
  const browser = await puppeteer.launch({
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zigote',
    ],
    //headless: false,
  });

  try {
    const [page] = await browser.pages();

    await page.goto('https://developer.chrome.com/blog');
    //await page.click('#devsite-hamburger-menu');
    await page.waitForSelector('devsite-book-nav');

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 5000);
    });
    const firstBlogArticle = await page.evaluate(() => {
      const el = document.querySelector('h3');
      if (el) return el.textContent;
    });
    console.log(firstBlogArticle);

    res.send(
      'Example App puppie. First blog article of the site https://developer.chrome.com/blog is: ' +
        firstBlogArticle
    );
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
