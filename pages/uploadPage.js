const commands = [{
  uploadTestImage: function() {
    this
        .waitForElementPresent('@fileUpload')
        .setValue('@fileUpload', `${this.api.globals.assetsPath}/${this.api.globals.testImage}`);
  },
}];

const elements = {
  fileUpload: {
    selector: 'input[type="file"]',
  },
};

module.exports = {
  url: 'https://imgur.com/upload',
  elements: elements,
  commands: commands,
};
