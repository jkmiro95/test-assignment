const headerCommands = {
    goToLogInPage() {
      this.waitForElementPresent('@signInLink');

      return this.click('@signInLink');
    },

    goToMyAccount() {
      this.waitForElementPresent('@myAccountLink');

      return this.click('@myAccountLink');
    },

    goToMainSite() {
      this.waitForElementPresent('@logo');

      return this.click('@logo');
    }
  };
  
  module.exports = {
    commands: [headerCommands],
    elements: {
      signInLink: 'a[href="#/login"]',
      myAccountLink: '.navbar-nav > li:nth-of-type(2)',
      logo: '.navbar-brand'
    }
  };