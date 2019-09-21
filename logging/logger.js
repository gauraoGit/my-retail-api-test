const Logger = function () {};

Logger.prototype.info = function (log) {
  console.log(`${new Date()}info:::::`);
  console.log(log);
};

Logger.prototype.debug = function (logText) {
  console.log(`${new Date()}debug:::::`);
  console.log(log);
};

Logger.prototype.error = function (log) {
  console.log(`${new Date()}error:::::`);
  console.log(log);
};

module.exports = new Logger();
