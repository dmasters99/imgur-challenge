let commands = [{
    uploadTestImage: function() {
        this
            .waitForElementPresent('@fileUpload')
            .setValue('@fileUpload', `${this.api.globals.assetsPath}/${this.api.globals.testImage}`)
    }
}]

let elements = {
    fileUpload: {
        selector: 'input[type="file"]',
    },
}

module.exports = {
    url: 'https://imgur.com/upload',
    elements: elements,
    commands: commands,
};