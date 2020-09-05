import config from 'config';

const logInPageCommands = {
  async logIn() {
    const user = config.get('user');
    this.waitForElementPresent('@email');
    await this.setValue('@email', user.email);
    await this.setValue('@password', user.pass);
    
    await this.assert.value('@email', user.email); //workaround for 'blank email' error
    this.waitForElementPresent('@validForm');
    this.pause(200);

    return this.click('@logInButton');
  },
};

module.exports = {
  commands: [logInPageCommands],
  elements: {
    email: 'input[placeholder="Username"]',
    validForm: 'form.dynamic-form.ng-valid.ng-touched',
    password: 'input[type="password"]',
    logInButton: 'button[type="submit"]'
  }
};