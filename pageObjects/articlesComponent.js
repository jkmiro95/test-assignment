import { isEqual } from 'lodash';

const articlesComponentCommands = {
  /**
   * Favorites article with given index
   * 
   * @param {number} articleIndex - index of article to favorite
   * 
   * @return {function} - waits for unfavorite article button to show up 
   */
  favoriteArticle(articleIndex) {
    const { articleItem, favoriteButton, unfavoriteButton } = this.elements;
    const favoriteArticleSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${favoriteButton.selector}`;
    const unfavoriteArticleSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${unfavoriteButton.selector}`;
    this.waitForElementPresent(favoriteArticleSelector)
    this.click(favoriteArticleSelector);

    return this.waitForElementPresent(unfavoriteArticleSelector)
  },

  /**
   * Asserts article with given index is marked as favorited
   * 
   * @param {number} articleIndex - index of article to assert
   * 
   * @return {function} - asserts 'unfavorite' button is present
   */
  assertArticleMarkedAsFavorited(articleIndex) {
    const { articleItem, unfavoriteButton } = this.elements;
    const unfavoriteArticleSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${unfavoriteButton.selector}`;

    return this.assert.elementPresent(unfavoriteArticleSelector);
  },

  /**
   * Goes to article with given index
   * 
   * @param {number} articleIndex - index of article to go to
   * 
   * @return {function} - waits for and asserts url is correct
   */
  goToArticleView(articleIndex) {
    const { articleItem, title } = this.elements;
    const articleSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${title.selector}`;
    this.waitForElementPresent(articleSelector);
    this.pause(200);
    this.click(articleSelector);

    return this.assert.urlContains('article');
  },

  async getRandomArticlesIndex() {
    const articles = await this.api.elements('@articleItem');

    return Math.floor(Math.random() * (articles.value.length - 1)) + 1
  },

  /**
   * Gets author and title of article with given index
   * 
   * @param {number} articleIndex - index of article to go to
   * 
   * @return {object} - author and title of article
   */
  async getArticlesData(articleIndex) {
    const {articleItem, author, title} = this.elements;
    const authorSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${author.selector}`;
    const titleSelector = `${articleItem.selector}:nth-of-type(${articleIndex}) ${title.selector}`;

    this.waitForElementPresent(authorSelector);
    this.waitForElementPresent(titleSelector);

    const articlesData = await Promise.all([
      this.api.getText(authorSelector),
      this.api.getText(titleSelector)
    ]);

    return {
      author: articlesData[0].value,
      title: articlesData[1].value,
    }
  },

  /**
   * Gets author and title of article with given index
   * 
   * @param {number} articleIndex - index of article to go to
   * 
   * @return {object} - author and title of article
   */
  async findArticleIndexByData(expectedArticlesData) {
    this.waitForElementPresent('@articleItem');
    this.waitForElementVisible('@articleItem');
    const articles = await this.api.elements('@articleItem');
    let articlesIndex = -1;
    let i = 0;

    console.log(articles.value);

    if (!articles.value || !articles.value.length) {
      console.log("No articles found");
      return -1;
    }

    do {
      i++;
      const articlesData = await this.getArticlesData(i);
      if (isEqual(articlesData, expectedArticlesData)) {
        articlesIndex = i;
        break;
      }
    } while(i !== articles.value.length)
    
    return articlesIndex;
  }
};

module.exports = {
  commands: [articlesComponentCommands],
  elements: {
    articleItem: 'app-article-list-item',
    favoriteButton: '.btn-outline-primary',
    unfavoriteButton: '.btn-primary',
    readMoreLink: 'a.preview-link > span',
    author: '.author',
    title: '.preview-link > h1'
  }
};