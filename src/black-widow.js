const puppeteer = require('puppeteer')

let scrape = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://coinmarketcap.com/')
  await page.waitFor(1000)

  const result = await page.evaluate(() => {
    const cryptos = []
    document.querySelectorAll('.logo-sprite').forEach(crypto => cryptos.push(crypto.alt))
    return cryptos
  })

  browser.close()

  return result
}

scrape()
  .then(value => console.log(value))
