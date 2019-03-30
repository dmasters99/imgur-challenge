module.exports = {

  'New Upload' : function (client) {

    var homePage = client.page.homePage();
    homePage.navigate();
    homePage.createNewPost();

    var uploadPage = client.page.uploadPage();
    uploadPage.uploadTestImage();

    var newPostPage = client.page.newPostPage();
    newPostPage.expect.element('@uploadNotice').text.to.contain('Upload complete').before(5000)

    client.end();

  }
};