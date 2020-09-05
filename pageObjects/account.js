const accountCommands = {
  goToFavoritedArticlesTab() {
    this.waitForElementPresent('@favoritedArticlesTab');
    this.waitForElementVisible('@favoritedArticlesTab');
    this.moveToElement('@favoritedArticlesTab', 0, 0); //workaround for not being able to click elem right away
    this.click('@favoritedArticlesTab');

    return this.assert.urlContains('favorites');
  }
};

module.exports = {
  commands: [accountCommands],
  elements: {
    favoritedArticlesTab: '.nav-pills > li:nth-of-type(2) > a'
  }
};