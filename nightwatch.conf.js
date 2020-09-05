require('@babel/register');

module.exports = {
  end_session_on_fail: false,
  src_folders: ['tests'],
  page_objects_path: ['pageObjects'],
  webdriver: {
    start_process: true,
    server_path: 'node_modules/.bin/chromedriver',
    port: 9515
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome'
      } 
    },
    staging: {}
  }
};