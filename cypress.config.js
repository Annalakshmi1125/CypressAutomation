const { defineConfig } = require("cypress");

const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');

//we have created one funtion and call them in e2e. Since nfuture we ave many processor to install we can do here

async function setupNodeEvents(on, config) {

  //Funtion config.db. Change DB as config.db. Now LoadPlugin is activated.
  config.db= {
    userName: "kanagaraj",
    password: "htc@2506",
    server: "kanagaraj-HP-ProBook-4440s",
    options: {
        database: "cypressautomation",
        encrypt: true,
        rowCollectionOnRequestCompletion : true
    }
  }
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  //We should add the details, The plug-in can be initialised in your
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'fy36uz',

  defaultCommandTimeout:6000,
  env: {
    url: 'https://rahulshettyacademy.com'
  },
  retries: {
    runMode: 1,
  },
  projectId: "2gvcjo",
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.js',
    //specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
  
});
