const assert = require("assert");
const TodoPage = require("../pages/todo/todopage.js");
const { beforeEach, afterEach } = require('mocha');

describe("Todo Test", async function () {
  beforeEach(async function() {
    await TodoPage.open();
  });

  it('sasd', async function() {
    let total = 5;
    let remaining = 5;
    for (let i = 1; i <= total; i++) {
        await TodoPage.checkMainText(remaining,total)
        remaining--
        await TodoPage.checkItemIsNotCrossed(i)
        await TodoPage.markItem(i)
    }
    await TodoPage.addTask("asd")
    total++
    remaining++
    await TodoPage.checkMainText(remaining,total)
    await TodoPage.markItem(total)
    remaining--
    await TodoPage.checkMainText(remaining,total)
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
        await TodoPage.screenshot("fail.png");
    }
    await TodoPage.closeBrowser();
  });
});
