const { Builder, By, Browser } = require("selenium-webdriver");


class BasePage {
    async goToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().setTimeouts({implicit: 5000});
        await driver.get(url)
    }
    async enterText(locator, text) {
        await driver.findElement(locator).sendKeys(text)
    }
    async click(locator) {
        await driver.findElement(locator).click();
    }
    async getClass(locator) {
        let element = await driver.findElement(locator)
        let itemClass = await element.getAttribute("class");
        return itemClass
    }
    async screenshot(fileName) {
        driver.takeScreenshot().then(function (image) {
            require('fs').writeFileSync(fileName, image, 'base64')
        })
    }
    async closeBrowser() {
        await driver.sleep(1000);
        await driver.quit()
    }
    async isElementPresent(locator) {
        try {
           await driver.wait(until.elementIsVisible(driver.findElement(locator)), 10000);
           return true;
        } catch (error) {
           return false;
        }
     }
     async getTextFromElement(locator) {
        await driver.wait(until.elementIsVisible(driver.findElement(locator)), 10000);
        return await driver.findElement(locator).getText();
     }
  
     async getTextFromMultipleElements(locator) {
        const elements = await driver.findElements(locator);
        const texts = [];
        for (const element of elements) {
           texts.push(await element.getText());
        }
        return texts;
     }
}

module.exports = BasePage;