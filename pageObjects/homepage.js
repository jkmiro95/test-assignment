const homepageCommands = {
  goToGlobalFeedTab() {
    this.waitForElementPresent('@globalFeedTab');
    this.click('@globalFeedTab');

    return this.waitForElementPresent('@articleItem')
  }
};

module.exports = {
  commands: [homepageCommands],
  elements: {
    globalFeedTab: '.nav-pills > li:nth-of-type(2)',
    articleItem: 'app-article-list-item'
  }
};