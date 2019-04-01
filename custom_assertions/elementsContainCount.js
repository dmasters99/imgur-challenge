/**
 * Checks if all of the elements matching a selector contain specific text, and that the count
 * of such elements meet or exceed the minimum expected amount.
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
    this.message = `Testing if all elements of class "${selector}" contain text "${text}" and that at least ${count} exist`;

    this.expected = count;

    /* If count of included is equal to or exceeds expected amount,
    and count excluded equals 0 this assertion succeeds */
    this.pass = function(val) {
        this.message += ` (Found: ${val.countInclude})`;
        return val.countInclude >= this.expected && val.countExclude === 0;
    };

    // Count the number of innerText values that contain the expected text
    this.value = function(res) {
        let countInclude = 0;
        let countExclude = 0;
        res.value.forEach(function(innerText) {
            if (innerText.toUpperCase().includes(text.toUpperCase())) {
                countInclude++;
            } else {
                countExclude++;
            }
        });

        return {
            'countInclude': countInclude,
            'countExclude': countExclude
        };
    };

    // Return the innerText values of all elements matching the selector
    this.command = function(callback) {
        return this.api.getElementsText(selector, callback);
    };
};