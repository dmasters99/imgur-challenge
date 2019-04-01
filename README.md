# Imgur Challenge

This repository contains nightwatch tests for [imgur.com](https://imgur.com/) using both chrome and firefox browsers.  The tests can easily be run either locally using web drivers, or with `docker-compose` using [pre-built selenium docker images](https://github.com/SeleniumHQ/docker-selenium).

## Usage

### Local Implementation

To run locally, install the dependencies

```bash
npm install
```

Then run the following commands to execute the tests.  Note that the [firefox driver](https://github.com/mozilla/geckodriver) does not support parallel tests: To achieve this, please see the docker implementation below instead. 

```bash
npm run test-chrome
npm run test-firefox
```

The results will show up in your `outputs/test_results` folder.  Screenshots of any failed tests will be recorded in the `outputs/screenshots` directory.

### Docker Implementation

Before running, be sure you have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.  You can then run the tests for each browser separately:

```bash
docker-compose -f docker/chrome.yml build
docker-compose -f docker/chrome.yml up

docker-compose -f docker/firefox.yml build
docker-compose -f docker/firefox.yml up
```

Or in parallel:
```bash
docker-compose -f docker/chrome.yml -f docker/firefox.yml build
docker-compose -f docker/chrome.yml -f docker/firefox.yml up
```

As with the local implementation, the results will appear in your `output` directory.

## Summary

The goal here was to test the following three features of the imgur website:

1. **New Post: Make sure you can upload an image and that it takes you to that page after**


For this test, we start on the home page and navigate to the upload page.  We upload a test image located in our `assets` directory and confirm that we receive a notification that the upload was successful, and that the expected `div` tag for a new image is visible on the page.

2. **Search: make sure you can search, and that the results are tied to your query**

The challenge here was how to best verify that the search results match our query.  I decided to create a search term `car` (configurable in `lib/globalsModule.js`) to be sure I can expect a sufficient amount of results.  Once the search is executed, the results page will contain a header such as `Found 55,042 results for car`.  However, simply looking at the header does not seem adequate for this test.

Each image in the results will show the title of the post when a mouse is hovered over it.  We can use the text of this element to verify that the subject matter matches our search.  If the word `car` is found in each post, and there are at least 10 matching posts, it will be considered a success.

There is no native `nightwatch` method which returns an array of `innerText` attributes for all elements on a page which match a given `selector`.  I used a [custom command](http://nightwatchjs.org/guide#extending) to create this functionality for our test, which can be located at `custom_commands/getElementsText.js`.

I also created a custom assertion to verify that all of the elements from the custom command contain our search word, located at `custom_assertions/elementsContainCount.js`.

3. **Random Mode function: test that the random button works and takes you to a new page without errors**

The *Random* button does not technically load a new page - instead it replaces the content within the body of the existing page.  Therefore, in order to test it, we need to compare the content before and after the button is pressed.

 
To achieve this, we can go straight to the source of all the posts: the image elements' `src` attribute.  Given the massive amount of posts hosted on imgur, we can reasonably expect that none of the images loaded after the *Random* button is pressed will have the same `src` value as before it is pressed.

Similar to the solution for Number 2, I created a new custom command which retrieves all of the `src` attributes that match the `selector`.  Then I added a test in `tests/random.spec.js` which verifies that the array of `src` links differ completely after *Random* is pressed.