let commands = [{
    createNewPost: function() {
        this
            .waitForElementVisible('@newPostButton')
            .click('@newPostButton')
    },
    search: function(searchTerm) {
        this.waitForElementVisible('@searchInput')
            .setValue('@searchInput', searchTerm)
            .click('@searchButton')
    },
    chooseRandom: function() {
        this.waitForElementVisible('@dropdown')
            .click('@dropdown')
            // Firefox needs time for dropdown element to fully load or it will crash
            .api.pause(1000)
        this.waitForElementVisible('@random')
            .click('@random')
            // Give some time for the new content to load
            .api.pause(4000)
    }
}]

let elements = {
    dropdown: {
        selector: '.Dropdown.sort.Dropdown--upper'
    },
    newPostButton: {
        selector: 'New post',
        locateStrategy: 'partial link text'
    },
    postImage: {
        selector: '.Post-item-media img',
    },
    random: {
        selector: "//div[contains(@class, 'Dropdown-option') and text()='Random']",
        locateStrategy: 'xpath'
    },
    searchInput: {
        selector: '.Searchbar-form input'
    },
    searchButton: {
        selector: 'button.Searchbar-submitInput'
    }
}


module.exports = {
    url: 'https://imgur.com',
    elements: elements,
    commands: commands,
};