const articleCommands = {
  favoriteArticle() {
    this.waitForElementPresent('@favoriteArticle');
    this.click('@favoriteArticle');

    return this.waitForElementPresent('@unfavoriteArticle');
  },

  unfavoriteArticle() {
    this.waitForElementPresent('@unfavoriteArticle');
    this.click('@unfavoriteArticle');

    return this.waitForElementPresent('@favoriteArticle');
  },

  assertArticleMarkedAsFavorited() {
    return this.assert.elementPresent('@unfavoriteArticle');
  },

  assertArticleMarkedAsUnfavorited() {
    return this.assert.elementPresent('@favoriteArticle');
  }
};

module.exports = {
  commands: [articleCommands],
  elements: {
    favoriteArticle: '.btn-outline-primary',
    unfavoriteArticle: '.btn-primary',
    author: '.author',
    title: '.container > h1'
  }
};