module.exports = {

    'Search for Images': function(client) {

        var homePage = client.page.homePage();
        homePage.navigate();
        homePage.search(client.globals.searchTerm);

        var searchResultsPage = client.page.searchResultsPage();
        searchResultsPage.assert.elementsContainCount(searchResultsPage.elements.description.selector,
            client.globals.searchTerm, 5)

    }
};