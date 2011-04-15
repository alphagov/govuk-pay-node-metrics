var Meter = require('./meter');
Histogram = require('./Histogram')
ExponentiallyDecayingSample = require('../stats/exponentially_decaying_sample');
/*
*  
*/
var Timer = module.exports = function Timer() {
  this.meter = new Meter();
  this.histogram = new Histogram(new ExponentiallyDecayingSample(1028, 0.015));
  this.clear();
  this.type = 'timer';
}

Timer.prototype.update = function(duration) { 
  this.histogram.update(duration);
  this.meter.mark();
}

// delegate these to histogram
Timer.prototype.clear = function() { return this.histogram.clear(); }
Timer.prototype.count = function() { return this.histogram.count(); }
Timer.prototype.min = function() { return this.histogram.min(); }
Timer.prototype.max = function() { return this.histogram.max(); }
Timer.prototype.mean = function() { return this.histogram.mean(); }
Timer.prototype.stdDev = function() { return this.histogram.stdDev(); }
Timer.prototype.percentiles = function(percentiles) { return this.histogram.percentiles(percentiles); }
Timer.prototype.values = function() { return this.histogram.values(); }

// delegate these to meter
Timer.prototype.oneMinuteRate = function() { this.meter.oneMinuteRate(); }
Timer.prototype.fiveMinuteRate = function() { this.meter.fiveMinuteRate(); }
Timer.prototype.fifteenMinuteRate = function() { this.meter.fifteenMinuteRate(); }
Timer.prototype.meanRate = function() { this.meter.meanRate(); }

Counter.prototype.printObj = function() {
  return {duration: this.histogram.printObj()
      , rate: this.meter.printObj()};
}

