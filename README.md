# Karma Growl Notifications Reporter

Quick and dirty growl notifications reporter for [Karma](http://karma-runner.github.io/0.10/index.html) that will fall back to Notification Center on Mac OS 10.8 or later when [terminal-notifier](https://github.com/alloy/terminal-notifier) is installed.


## Installation

```
npm install karma-growl-notifications-reporter --save-dev
```

## Usage

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'growl-notifications']
  });
};
```

Or, using the karma start command.

```
karma start --reporters progress,growl-notifications
```
