
const MospolyPage = require("../pages/mospolytech/mospolypage.js");
const assert = require("assert");
const { beforeEach, afterEach } = require('mocha');

describe("Mospoly Test", async function () {
    beforeEach(async function() {
      await MospolyPage.open();
    });
  
    it('sasd', async function() {
      await MospolyPage.enterTimetables()
      await MospolyPage.switchWindow()
      await MospolyPage.searchGroup("221-321")
      await MospolyPage.selectGroup("221-321")
      await MospolyPage.checkIfCurrentDayColored()
    });
  
    afterEach(async function() {
      if (this.currentTest.state === 'failed') {
          await MospolyPage.screenshot("fail.png");
      }
      await MospolyPage.closeBrowser();
    });
  });
  