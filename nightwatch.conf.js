var seleniumServer = require('selenium-server');
var chromedriver = require('chromedriver');
var geckodriver = require('geckodriver');

const firefoxCapabililties = {
    "browserName": "firefox",
    "javascriptEnabled": true,
    "acceptSslCerts": true,
    "nativeEvents": true,
}

const chromeCapabilities = {
    "browserName": 'chrome',
    "chromeOptions": {
        "args": ["start-maximized"]
    }
}

const config = {
    "src_folders": ["tests"],
    "globals_path": "lib/globalsModule.js",
    "page_objects_path": "pages",
    "custom_assertions_path": "custom_assertions",
    "custom_commands_path": "custom_commands",
    "output_folder": "output/test_results",
    "screenshots": {
        "enabled": true,
        "on_failure": true,
        "on_error": false,
        "path": "output/screenshots"
    },
    "test_settings": {
        "chrome": {
            "webdriver": {
                "start_process": true,
                "server_path": chromedriver.path,
                "cli_args": [
                    "--verbose"
                ],
                "log_path": "log",
                "port": 9515
            },
            "desiredCapabilities": chromeCapabilities
        },
        "firefox": {
            "webdriver": {
                "start_process": true,
                "server_path": geckodriver.path,
                "cli_args": [
                    "--log", "debug"
                ],
                "log_path": "log",
                "port": 4444
            },
            "desiredCapabilities": firefoxCapabililties
        },
        "dockerChrome": {
            "selenium": {
                "host": "chrome",
                "port": 4444,
            },
            "desiredCapabilities": chromeCapabilities
        },
        "dockerFirefox": {
            "selenium": {
                "host": "firefox",
                "port": 4444,
            },
            "desiredCapabilities": firefoxCapabililties
        },
    }
}

module.exports = config