const MospolyPage = require("../pages/mospolytech/mospolypage.js");
const assert = require("assert");
const { beforeEach, afterEach } = require('mocha');
const { allure } = require("allure-mocha/runtime");
const fs = require("fs");
describe("Mospoly Test", async function () {
    beforeEach(async function() {
        await allure.step('Открытие страницы Мосполитеха', async () => {
            await MospolyPage.open();
        });
    });
  
    it('Политех', async function() {
        await allure.step('Переход в раздел расписаний', async () => {
            await MospolyPage.enterTimetables();
        });
        
        await allure.step('Переключение на окно расписаний', async () => {
            await MospolyPage.switchWindow();
        });
        
        await allure.step('Поиск группы 221-321', async () => {
            await MospolyPage.searchGroup("221-321");
        });
        
        await allure.step('Выбор группы 221-321', async () => {
            await MospolyPage.selectGroup("221-321");
        });
        
        await allure.step('Проверка, что текущий день выделен цветом', async () => {
            await MospolyPage.checkIfCurrentDayColored();
        });
    });
  
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            await allure.step('Сделать скриншот при ошибке', async () => {
                await MospolyPage.screenshot("fail_mospoly.png");
                allure.attachment("image.png", fs.readFileSync("fail_mospoly.png"), "image/png");
            });
        }
        await allure.step('Закрытие браузера', async () => {
            await MospolyPage.closeBrowser();
        });
    });
});
