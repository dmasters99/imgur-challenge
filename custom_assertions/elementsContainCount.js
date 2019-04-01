/**
 * Checks if the number of elements matching a selector and contain specific test meet or exceed the expected amount.
 *
 * ```
 *    this.demoTest = function (client) {
 *      client.assert.elementsContainCount('@someSelector', 'sample text'  10);
 *    };
 * ```
 *
 * @method attributeContains
 * @param {string} selector - The CSS selector used to locate the elements.
 * @param {string} text - The expected text the elemens should contain
 * @param {integer} count - The minimum value of elements which pass the criteria for the test to succeed
 * @api assertions
 */

exports.assertion = function(selector, text, count) {
  this.message = `Testing if at least ${count} elements of class "${selector}" contain text "${text}"`;

  this.expected = count;

  // If count is equal to or exceeds expected amount, this assertion succeeds
  this.pass = function(val) {
    this.message += ` (Found: ${val})`;
    return (val) => this.expected;
  };

  // Count the number of innerText values that contain the expected text
  this.value = function(res) {
    let count = 0;
    res.value.forEach(function(innerText) {
      if (innerText.includes(text)) {
        count++;
      }
    });

    return count;
  };

  // Return the innerText values of all elements matching the selector
  this.command = function(callback) {
    return this.api.getElementsText(selector, callback);
  };
};
