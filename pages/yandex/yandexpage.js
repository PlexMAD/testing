const { get } = require('selenium-webdriver/http');
const BasePage = require('../basepage');
const { Builder, By, Browser } = require("selenium-webdriver");

class YandexPage extends BasePage {
    async open() {
        await this.goToUrl("https://market.yandex.ru");
        await driver.sleep(1000);
    }

    async openCatalogue() {
        await this.click(By.xpath("//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']"));
        await driver.sleep(2000);
        await driver
            .actions()
            .move({ origin: await driver.findElement(By.xpath("//li//a[@href='/catalog--geiming/41813350']")) })
            .perform();
        await driver.sleep(2000);
        await this.click(By.xpath("//a[@href='/catalog--igrovye-pristavki-xbox/41813471/list?hid=91122&glfilter=12782797%3A17888497%2C15163455%2C15163454%2C15163453%2C15163452%2C16092905']"));
    }

    async logElements() {
        const xboxTitles = await driver.findElements(By.xpath("//h3[@class='G_TNq _2SUA6 _33utW _13aK2 h29Q2 _1A5yJ']"));
        const xboxPrices = await driver.findElements(By.xpath("//span[@class='_1ArMm']"));
        const elements = await Promise.all(
            xboxTitles.slice(0, 5).map(async (el, i) => [await el.getText(), await xboxPrices[i + 1].getText()]),
        );
        for (let [title, price] of elements) {
            console.log(title, price);
        }
        return elements;
    }

    async addFavorites(index) {
        const buttons = await driver.findElements(By.xpath("//button[@title='Добавить в избранное']"));
        await buttons[index].click(); 
    }

    async openFavorites() {
        await this.click(By.xpath("//a[@href='/my/wishlist?track=head']"));
    }

    async getFavorites() {
        const titles = await this.getTextFromMultipleElements(By.xpath("//h3[@class='G_TNq _2SUA6 _33utW _13aK2 _2a1rW _1A5yJ']"));
        const prices = await this.getTextFromMultipleElements(By.xpath("//span[@class='_1ArMm']"));
        return [titles, prices];
    }

    async removeFavorites() {
            await this.click(By.xpath("//button[@title='Удалить из избранного']"));
    }

    async refreshPage() {
        await driver.navigate().refresh();
    }

}

module.exports = new YandexPage();
