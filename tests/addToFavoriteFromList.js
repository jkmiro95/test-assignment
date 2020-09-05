import assert from 'assert';
import config from 'config';


let account, article, articlesComponent, header, homepage;
let articlesIndex, articlesData;

module.exports = {
  before: function (browser, done) {
    account = browser.page.account();
    article = browser.page.article();
    articlesComponent = browser.page.articlesComponent();
    header = browser.page.header();
    homepage = browser.page.homepage();

    const auth = config.get('auth');
    browser.url(`https://${auth.login}:${auth.pass}@qa-task.backbasecloud.com`);

    done();
  },

  after: function (browser, done) {
    console.log('Finishing');
    browser.end();
    done();
  },

  'Maximize window': function (browser) {
    browser.maximizeWindow();
  },

  'Go to log in page': () => {
    return header.goToLogInPage();
  },

  'Log in': async browser => {
    const logInPage = browser.page.logInPage();

    return logInPage.logIn();
  },

  'Go to global feed': () => {
    return homepage.goToGlobalFeedTab();
  },

  'Get random article index': async () => {
    return articlesIndex = await articlesComponent.getRandomArticlesIndex();
  },

  'Get articles data': async () => {
    return articlesData = await articlesComponent.getArticlesData(articlesIndex);
  },

  'Favorite an article': () => {
    return articlesComponent.favoriteArticle(articlesIndex)
  },

  'Go to the articles view': () => {
    return articlesComponent.goToArticleView(articlesIndex);
  },

  'Assert article is marked as favorited': () => {
    return article.assertArticleMarkedAsFavorited();
  },

  'Go to my account': () => {
    return header.goToMyAccount();
  },

  'Go to favorited articles tab': () => {
    return account.goToFavoritedArticlesTab();
  },

  'Assert article is in favorited': async () => {
    const articlesIndexInFavorited = await articlesComponent.findArticleIndexByData(articlesData);

    return assert.ok(articlesIndexInFavorited !== -1);
  },

  'Refresh site': browser => {
    return browser.refresh();
  },

  'Assert article is in favorited - SSR': async () => {
    const articlesIndexInFavorited = await articlesComponent.findArticleIndexByData(articlesData);

    return assert.ok(articlesIndexInFavorited !== -1);
  },

  'Go to main site': () => {
    return header.goToMainSite();
  },

  'Go to global feed once again': () => {
    return homepage.goToGlobalFeedTab();
  },

  'Find index of an article': async () => {
    return articlesIndex = await articlesComponent.findArticleIndexByData(articlesData);
  },

  'Assert article is marked as favorited on list - SSR': () => {
    return articlesComponent.assertArticleMarkedAsFavorited(articlesIndex);
  },

  'Go to the articles view once again': () => {
    return articlesComponent.goToArticleView(articlesIndex);
  },

  'SSR, artciles view - assert article is marked as favorited': () => {
    return article.assertArticleMarkedAsFavorited();
  },

  'Clean up: unfavorite article': () => {
    return article.unfavoriteArticle();
  }
}