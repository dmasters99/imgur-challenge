// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions


exports.assertion = function (selector, text, count) {
  this.message = `Testing if at least ${count} elements of class "${selector.selector}"" contain text: ${text}`;

  this.expected = count;
  
  this.pass = function (val) {
    return val === this.expected;
  }
  
  this.value = function (res) {
    const self = this
    res.value.forEach(function(element){
      self.api.elementIdAttribute(element.ELEMENT, 'innerText', function(res){
        console.log(res)
      })
    })

    return 7;
  }
  
  this.command = callback => {
    return this.api.elements('css selector', selector, callback);
  }
}