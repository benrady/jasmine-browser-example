var fs = require('fs');
var path = require('path');
var jsdir = path.dirname(fs.realpathSync(__filename));
require.paths.unshift(path.join(jsdir, "../public"));

var horseman = require('horseman');
horseman.autoReload(
  'js/utils/jquery-1.6.min', 
  function() {
    delete global.$;
    global.$ = window.$; 
    global.jQuery = window.jQuery;
  }
);

exports.buildWindow = function() {
  horseman.buildWindow('public/index.html');
};
exports.buildWindow();

global._ = require('js/utils/underscore-min')._;
require('js/utils/modit');
require('js/siren');

jasmine.getEnv().beforeEach(function() {
  exports.buildWindow();
  this.addMatchers({
    toHaveBeenCalledWithPrefix: function() {
      /* This call serves two purposes. The first is to set up all the
       * messaging to be the same as .toHaveBeenCalledWith. The second is
       * that if it matches exactly, there's no need to go thru the args a
       * second time. */
      if (jasmine.Matchers.prototype.toHaveBeenCalledWith.apply(this, arguments)) {
        return true;
      }

      var expected = jasmine.util.argsToArray(arguments);
      var i;
      for (i = 0; i < this.actual.argsForCall.length; i++) {
        var actual = this.actual.argsForCall[i];
        var equal = true;
        for (j = 0; j < expected.length && equal; j++) {
          equal = JSON.stringify(actual[j]) === JSON.stringify(expected[j]);
        }
        if (equal) {
          return true;
        }
      }
      return false;
    },
  });
});
