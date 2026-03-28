const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      pageLoadTimeout: 60000
      defaultCommandTimeout: 10000
    },
    projectId: "t9fq9y"
    /*reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
    html: true,
    json: false,
    video: false,
    screenshotOnRunFailure: true
  },*/
  },
});
