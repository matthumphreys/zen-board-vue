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
      .assert.visible('table.main')
      .assert.containsText('.heading', 'Acme Dev Team')
      .assert.elementCount('video', 1)
      .end()
  },

  'new row': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .assert.elementNotPresent('.row-label[data-is-test-data=true]')

      .click('.nav-row-new')
      .waitForElementVisible('input.tdc-label', 1000)
      .assert.visible('input.tdc-label')
      .assert.visible('.tdc-position select')
      .assert.visible('textarea.tdc-description')

      .setValue('input.tdc-label', '0F65u28Rc66ORYII')

      .click('.zre-button-save')
      .waitForElementNotPresent('input.tdc-label', 1000)
      .waitForElementVisible('.row-label[data-is-test-data=true]', 1000)

      // Remove test data
      .url('http://localhost:3001/api/rows/delete-test-data')

      // Check test data removed successfuly
      .url(devServer)
      .waitForElementVisible('.row-label', 1000)
      .assert.elementNotPresent('.row-label[data-is-test-data=true]')
      .end()
  }
}
