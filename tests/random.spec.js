// Parse an array of image sources from matching elements
const getImgLinks = function(client, selector) {
  return new Promise(function(resolve, reject) {
    client.getElementsSrc(selector, function(res) {
      resolve(res.value);
    });
  });
};

// Returns false if any element in first array also exists in second array
const arraysUnique = function(imgBeforeArr, imgAfterArr) {
  return !(imgBeforeArr.some((imgBefore) => imgAfterArr.includes(imgBefore)));
};

module.exports = {

  'Generate Random Page': async function(client) {
    const homePage = client.page.homePage();
    homePage.navigate();
    homePage.expect.element('@dropdown').text.to.not.equal('RANDOM');

    // Get an array of image links before we change to RANDOM
    const imgBeforeArr = await getImgLinks(client, homePage.elements.postImage.selector);

    homePage.chooseRandom();
    homePage.expect.element('@dropdown').text.to.equal('RANDOM');

    // Get the new array of image links now that the content as loaded
    const imgAfterArr = await getImgLinks(client, homePage.elements.postImage.selector);

    // Assert that the new content does not contain any old links
    client.assert.ok(arraysUnique(imgBeforeArr, imgAfterArr), 'Test that all image links are fresh');
  },
};
