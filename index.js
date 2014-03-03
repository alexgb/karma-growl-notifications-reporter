var util = require('util');
var growl = require('growl');
var os = require('os');
var isDarwin = process.platform === 'darwin';

function successIcon() {
  return isDarwin ? '✅' : '';
}

function errorIcon() {
  return isDarwin ? '🚫' : '';
}

function errorImage() {
    if (os.type() == 'Linux') {
        return 'dialog-error';
    }
    return '';
}

function successImage() {
    if (os.type() == 'Linux') {
        return 'dialog-ok';
    }
    return '';
}

var GrowlNotificationsReporter = function(helper, logger) {
  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);
    var title, message, icon = '';

    if (results.disconnected || results.error) {
      title = util.format('ERROR - %s', browser.name);
      message = 'Test error';
      icon = errorImage();
    }
    else if (results.failed) {
      title = util.format('%s FAILED - %s', errorIcon(), browser.name);
      message = util.format('%d/%d tests failed in %s.', results.failed, results.total, time);
      icon = errorImage();
    }
    else {
      title = util.format('%s PASSED - %s', successIcon(), browser.name);
      message = util.format('%d tests passed in %s.', results.success, time);
      icon = successImage();
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
