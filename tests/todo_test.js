const assert = require("assert");
const TodoPage = require("../pages/todo/todopage.js");
const { beforeEach, afterEach } = require('mocha');
const { allure } = require("allure-mocha/runtime");
const fs = require("fs");

describe("Todo Test", async function () {
  beforeEach(async function() {
    await allure.step('Открытие страницы Todo', async () => {
      await TodoPage.open();
    });
  });

  it('sasd', async function() {
    let total = 5;
    let remaining = 5;

    for (let i = 1; i <= total; i++) {
      await allure.step(`Проверка основного текста с ${remaining} оставшимися из ${total}`, async () => {
        await TodoPage.checkMainText(remaining, total);
      });

      remaining--;

      await allure.step(`Проверка, что элемент ${i} не зачеркнут`, async () => {
        await TodoPage.checkItemIsNotCrossed(i);
      });

      await allure.step(`Отметка элемента ${i} как выполненного`, async () => {
        await TodoPage.markItem(i);
      });

      await allure.step(`Проверка, что элемент ${i} зачеркнут`, async () => {
        await TodoPage.checkItemIsCrossed(i);
      });
    }

    await allure.step('Добавление новой задачи', async () => {
      await TodoPage.addTask("asd");
    });

    total++;
    remaining++;

    await allure.step(`Проверка основного текста с ${remaining} оставшимися из ${total}`, async () => {
      await TodoPage.checkMainText(remaining, total);
    });

    await allure.step(`Проверка, что элемент ${total} не зачеркнут`, async () => {
      await TodoPage.checkItemIsNotCrossed(total);
    });

    await allure.step(`Отметка элемента ${total} как выполненного`, async () => {
      await TodoPage.markItem(total);
    });

    await allure.step(`Проверка, что элемент ${total} зачеркнут`, async () => {
      await TodoPage.checkItemIsCrossed(total);
    });

    remaining--;

    await allure.step(`Проверка основного текста с ${remaining} оставшимися из ${total}`, async () => {
      await TodoPage.checkMainText(remaining, total);
    });
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await allure.step('Сделать скриншот при ошибке', async () => {
        await TodoPage.screenshot("fail_todo.png");
        allure.attachment("image.png", fs.readFileSync("fail_todo.png"), "image/png");
      });
    }

    await allure.step('Закрытие браузера', async () => {
      await TodoPage.closeBrowser();
    });
  });
});
