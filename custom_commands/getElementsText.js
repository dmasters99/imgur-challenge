exports.command = function(selector, callback){
  const self = this
  this.execute(
    function(selector) { // execute application specific code inside the actual browser's DOM

      elementVals = []
      document.querySelectorAll(selector).forEach(node => {
        elementVals.push(node.innerText)
      })
      return elementVals;
    },

    [selector], // arguments array to be passed

    function(result) {
      if (typeof callback === "function") {
        callback.call(self, result);
      }
    }
  );
}