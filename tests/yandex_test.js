const assert = require("assert");
const YandexPage = require("../pages/yandex/yandexpage.js");
const { beforeEach, afterEach } = require('mocha');
const { By } = require("selenium-webdriver");
const { allure } = require("allure-mocha/runtime");
const fs = require("fs");

describe("Yandex Test", async function () {
    beforeEach(async function() {
        await allure.step('Открытие страницы Яндекс', async () => {
            await YandexPage.open();
            await driver.manage().window().maximize();
        });
    });

    it('Яндекс', async function() {
        await allure.step('Открытие каталога', async () => {
            await YandexPage.openCatalogue();
        });

        const elems = await allure.step('Получение элементов каталога', async () => {
            return await YandexPage.logElements();
        });

        const itemIndex = 0;

        await allure.step('Добавление элемента в избранное', async () => {
            await YandexPage.addFavorites(itemIndex);
        });

        await driver.sleep(3000);

        await allure.step('Открытие избранного', async () => {
            await YandexPage.openFavorites();
        });

        await driver.sleep(3000);

        const [titles, prices] = await allure.step('Получение элементов из избранного', async () => {
            return await YandexPage.getFavorites();
        });

        console.log(titles, prices);

        await allure.step('Проверка названий и цен', async () => {
            if (titles.length > 0 && prices.length > 0) {
                if (titles[0] !== elems[itemIndex][0]) {
                    console.log(`Ожидалось название: ${elems[itemIndex][0]}, текущее название: ${titles[0]}`);
                }

                if (prices[0] !== elems[itemIndex][1]) {
                    console.log(`Ожидалась цена: ${elems[itemIndex][1]}, текущая цена: ${prices[0]}`);
                }
            }
        });

        await driver.sleep(1000);

        await allure.step('Удаление элемента из избранного', async () => {
            await YandexPage.removeFavorites();
        });

        await driver.sleep(2000);

        await allure.step('Обновление страницы', async () => {
            await YandexPage.refreshPage();
        });

        await driver.sleep(3000);

        await allure.step('Проверка присутствия элемента пустого состояния', async () => {
            await YandexPage.isElementPresent(By.xpath("//span[@data-auto='emptyStateHeader']"));
        });
    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            await allure.step('Сделать скриншот при ошибке', async () => {
                await YandexPage.screenshot("fail_yandex.png");
                allure.attachment("image.png", fs.readFileSync("fail_yandex.png"), "image/png");
            });
        }

        await allure.step('Закрытие браузера', async () => {
            await YandexPage.closeBrowser();
        });
    });
});
