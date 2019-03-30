const config = {
  "src_folders" : ["tests"],
  "globals_path": "lib/globalsModule.js",
  "page_objects_path": "pages",
  "custom_assertions_path": "custom_assertions",
  "webdriver" : {
    "start_process": true,
    "server_path": "node_modules/.bin/chromedriver",
    "port": 9515
  },
  "test_settings" : {
    "default" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions" : {
          "args" : ["start-maximized"]
        }
      },
    }
  }
}

module.exports = config