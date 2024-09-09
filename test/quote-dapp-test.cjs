const { expect } = require("chai");

describe("QuoteDapp", function () {
  let QuoteDapp;
  let quoteDapp;

  before(async function () {
    // Deploy contract before running tests
    QuoteDapp = await ethers.getContractFactory("QuoteDapp");
    quoteDapp = await QuoteDapp.deploy();
    await quoteDapp.waitForDeployment();
  });

  describe("addQuote", function () {
    it("Should add a new quote and emit the correct event", async function () {
      const username = "Lechero";
      const content = "Hello! Feels good to know blockchain";

      // Add a new quote
      await expect(quoteDapp.addQuote(username, content))
        .to.emit(quoteDapp, "QuoteDapp__AddNewQuote")
        .withArgs(username, content);

      // Check if the quote count is 1
      expect(await quoteDapp.getQuoteCount()).to.equal(1);

      // Retrieve the quote and check its content
      const quote = await quoteDapp.getQuote(0);
      expect(quote[0]).to.equal(username);
      expect(quote[1]).to.equal(content);
    });
  });

  describe("getQuote", function () {
    it("Should revert if the quote index is out of bounds", async function () {
      await expect(quoteDapp.getQuote(999)).to.be.revertedWithCustomError(
        quoteDapp,
        "QuoteNotFound"
      );
    });

    it("Should return the correct quote", async function () {
      const username = "Isabella";
      const content = "Do more of Web3";

      // Add another quote
      await quoteDapp.addQuote(username, content);

      // Check if the quote count is 2
      expect(await quoteDapp.getQuoteCount()).to.equal(2);

      // Retrieve the new quote
      const quote = await quoteDapp.getQuote(1);
      expect(quote[0]).to.equal(username);
      expect(quote[1]).to.equal(content);
    });
  });

  describe("getQuoteCount", function () {
    it("Should return the correct number of quotes", async function () {
      expect(await quoteDapp.getQuoteCount()).to.equal(2);
    });
  });
});
