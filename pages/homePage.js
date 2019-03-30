// Commands
let commands = [
  {
    createNewPost: function () {
      this
        .waitForElementVisible('@newPostButton')
        .click('@newPostButton')
    },
    search: function(searchTerm) {
      this.waitForElementVisible('@searchInput')
        .setValue('@searchInput', searchTerm)
        .click('@searchButton')
    }
  }
]

// Element selectors
let elements = {
    newPostButton: {
      selector: 'New post',
      locateStrategy: 'partial link text'
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