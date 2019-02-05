const puppeteer = require('puppeteer')
const fs = require('fs')

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
  .then((value) => {
    value.map(function(item) {
      fs.appendFile('cryptolist.text', `${item} \n`, (err) => {
        if(err) console.log(err)
      })
    })
  })
