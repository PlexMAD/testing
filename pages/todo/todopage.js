const { get } = require('selenium-webdriver/http');
const BasePage = require('../basepage')
const { Builder, By, Browser } = require("selenium-webdriver");
const assert = require("assert");

class TodoPage extends BasePage {
    get taskform() {
        return By.id('sampletodotext')
    }
    get addButton() {
        return By.id('addbutton')
    }
    async addTask(text) {
        await this.enterText(this.taskform, text)
        await driver.sleep(1000);
        await this.click(this.addButton)
        await driver.sleep(1000);
    }
    async checkItemIsNotCrossed(item) {
        let itemClass = await this.getClass(By.xpath(`//input[@name='li${item}']/following-sibling::span`))
        assert.equal(itemClass, "done-false");
    }
    async markItem(item){
        await this.click(By.name("li" + item))
        await driver.sleep(1000);
    }
    async checkMainText(remaining, total) {
        let mainTextElement = await driver.findElement(
            By.xpath("//span[@class='ng-binding']")
          );
        let actualText = await mainTextElement.getText();
        let expectedText = `${remaining} of ${total} remaining`;
      
        assert.strictEqual(actualText, expectedText);
      }
    async open() {
        await this.goToUrl("https://lambdatest.github.io/sample-todo-app/")
        await driver.sleep(1000);
    }
}

module.exports = new TodoPage()