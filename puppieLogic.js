const puppeteer = require('puppeteer');

module.exports = { puppieLogic };

/* (async () => {
  await puppieLogic();
})(); */

async function puppieLogic(res) {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const [page] = await browser.pages();

    const url = 'https://developer.chrome.com/docs/extensions';

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
