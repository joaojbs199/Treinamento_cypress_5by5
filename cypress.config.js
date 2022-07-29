const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.realworld.io/#",
    env: {
      username: "teste-abc",
      email: "teste-abc@abc.com",
      password: "teste-abc",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
