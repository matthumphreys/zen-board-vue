// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.visible('.zbr-main')
      .assert.containsText('.zbr-heading', 'Acme Dev Team')
      .assert.elementCount('video', 1)
      .end()
  },

  'new row': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .assert.elementNotPresent('.zro-title[data-is-test-data=true]')

      .click('.zbr-add-row')
      .waitForElementVisible('.zfo-title', 1000)
      .assert.visible('.zfo-title input')
      .assert.visible('.zre-position select')
      .assert.visible('.zfo-description textarea')

      .setValue('.zfo-title input', '0F65u28Rc66ORYII')

      .click('.zen-row-editor .zfo-save')
      .waitForElementNotPresent('.zfo-title input', 1000)
      .waitForElementVisible('.zro-title[data-is-test-data=true]', 1000)

      // Remove test data
      .url('http://localhost:3001/api/rows/delete-test-data')

      // Check test data removed successfuly
      .url(devServer)
      .waitForElementVisible('.zro-title', 1000)
      .assert.elementNotPresent('.zro-title[data-is-test-data=true]')
      .end()
  }
}
