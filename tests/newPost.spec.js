module.exports = {

    'New Upload': function(client) {

        // Navigate to upload page
        var homePage = client.page.homePage();
        homePage.navigate();
        homePage.createNewPost();

        // Upload test image from the assets directory
        var uploadPage = client.page.uploadPage();
        uploadPage.uploadTestImage();

        // Verify that a successful notification appears and that the image div is visible
        var newPostPage = client.page.newPostPage();
        newPostPage.expect.element('@uploadNotice').text.to.contain('Upload complete').before(5000)
        newPostPage.assert.visible('@newImage')

    }
};