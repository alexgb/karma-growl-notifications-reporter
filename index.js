var util = require('util');
var growl = require('growl');
var isDarwin = process.platform === 'darwin';

function successIcon() {
  return isDarwin ? '✅' : '';
}

function errorIcon() {
  return isDarwin ? '🚫' : '';
}

var GrowlNotificationsReporter = function(helper, logger) {
  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);
    var title, message;

    if (results.disconnected || results.error) {
      title = util.format('ERROR - %s', browser.name);
      message = 'Test error';
    }
    else if (results.failed) {
      title = util.format('%s FAILED - %s', errorIcon(), browser.name);
      message = util.format('%d/%d tests failed in %s.', results.failed, results.total, time);
    }
    else {
      title = util.format('%s PASSED - %s', successIcon(), browser.name);
      message = util.format('%d tests passed in %s.', results.success, time);
    }

    growl(message, {title: title});
  }
};


// Inject dependencies
GrowlNotificationsReporter.$inject = ['helper'];

// Publish di module
module.exports = {
  'reporter:growl-notifications': ['type', GrowlNotificationsReporter]
};
