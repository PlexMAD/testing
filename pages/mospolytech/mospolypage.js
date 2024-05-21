const { get } = require('selenium-webdriver/http');
const BasePage = require('../basepage')
const { Builder, By, Browser, Key } = require("selenium-webdriver");
const assert = require("assert");
const { click } = require('../todo/todopage');

class MospolyPage extends BasePage {
    async open() {
        await this.goToUrl("https://mospolytech.ru")
        await driver.sleep(3000);
    }
    async switchWindow(){
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
    }
    async searchGroup(group) {
        await this.enterText(By.xpath('//div[@class="header-search search"]/input[@class="groups"]'), group);
        driver.sleep(1000)
        await this.enterText(By.xpath('//div[@class="header-search search"]/input[@class="groups"]'), Key.RETURN);
    }
    async enterTimetables() {
        await click(By.xpath('//*[@title="Расписание"]'));
        await driver.sleep(1000)
        await click(By.xpath('//a[span[text()="Смотрите на сайте"]]'));
        await driver.sleep(1000)
    }
    async selectGroup(groupNumber) {
        await driver.sleep(1000)
        await click(By.xpath(`//div[@class="found-groups row not-print"]//div[contains(text(), '${groupNumber}')]`))
        await driver.sleep(3000)
      }
      async checkIfCurrentDayColored() {
        if (new Date().getDay() === 0) { 
            return true; 
          }
        let days = await driver.findElements(
          By.xpath(`//div[@class="schedule-week"]/child::div`)
        );
        let thisDay;
        for (let i = 0; i < days.length; i++) {
          if (days.indexOf(days[i]) == new Date().getDay() - 1) {
            thisDay = days[i];
          }
        }
        const result = await thisDay.getAttribute("class")
        return result === "schedule-day schedule-day_today"
      }
}

module.exports = new MospolyPage();