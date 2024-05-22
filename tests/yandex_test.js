const assert = require("assert");
const YandexPage = require("../pages/yandex/yandexpage.js");
const { beforeEach, afterEach } = require('mocha');
const { By } = require("selenium-webdriver");

describe("Yandex Test", async function () {
    beforeEach(async function() {
        await YandexPage.open();
        await driver.manage().window().maximize();
    });

    it('Яндекс', async function() {
        await YandexPage.openCatalogue();
        const elems = await YandexPage.logElements();
        const itemIndex = 0;  
        await YandexPage.addFavorites(itemIndex);
        await driver.sleep(3000);
        await YandexPage.openFavorites();
        await driver.sleep(3000);
        
        const [titles, prices] = await YandexPage.getFavorites();
        console.log(titles, prices);

        if (titles.length > 0 && prices.length > 0) {
            if (titles[0] !== elems[itemIndex][0]) {
                console.log(`Ожидалось название: ${elems[itemIndex][0]}, текущее название: ${titles[0]}`);
            }

            if (prices[0] !== elems[itemIndex][1]) {
                console.log(`Ожидалась цена: ${elems[itemIndex][1]}, текущая цена: ${prices[0]}`);
            }
        } 
        await driver.sleep(1000);
        await YandexPage.removeFavorites();
        await driver.sleep(2000);

        await YandexPage.refreshPage();
        await driver.sleep(3000);
        await YandexPage.isElementPresent(By.xpath("//span[@data-auto='emptyStateHeader']"))
        

    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            await YandexPage.screenshot("fail.png");
        }
        await YandexPage.closeBrowser();
    });
});
