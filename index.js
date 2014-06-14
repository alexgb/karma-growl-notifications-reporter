var util = require('util');
var growl = require('growl');
var os = require('os');
var isDarwin = process.platform === 'darwin';

function successEmoji() {
  return isDarwin ? '✅' : '';
}

function errorEmoji() {
  return isDarwin ? '🚫' : '';
}

function successIcon() {
  if (os.type() == 'Linux') {
    return 'dialog-ok';
  }
  return '';
}

function errorIcon() {
  if (os.type() == 'Linux') {
    return 'dialog-error';
  }
  return '';
}

var GrowlNotificationsReporter = function(helper, logger) {
  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);
    var title, message, icon;

    if (results.disconnected || results.error) {
      title = util.format('ERROR - %s', browser.name);
      message = 'Test error';
      icon = errorIcon();
    }
    else if (results.failed) {
      title = util.format('%s FAILED - %s', errorEmoji(), browser.name);
      message = util.format('%d/%d tests failed in %s.', results.failed, results.total, time);
      icon = errorIcon();
    }
    else {
      title = util.format('%s PASSED - %s', successEmoji(), browser.name);
      message = util.format('%d tests passed in %s.', results.success, time);
      icon = successIcon();
    }

    growl(message, {title: title, image: icon});
  }
};


// Inject dependencies
GrowlNotificationsReporter.$inject = ['helper'];

// Publish di module
module.exports = {
  'reporter:growl-notifications': ['type', GrowlNotificationsReporter]
};
