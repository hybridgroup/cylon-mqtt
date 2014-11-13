/*
 * cylon-mqtt driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

'use strict';

var Cylon = require('cylon');

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);

  this.topic = opts.topic;

  this.commands = {
    publish: this.publish
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.adaptor.subscribe(this.topic);

  this.adaptor.on('message', function(topic, message) {
    if (topic === this.topic) {
      this.emit('message', message);
    }
  }.bind(this));

  callback(null);
};

Driver.prototype.halt = function(callback) {
  callback(null);
};

Driver.prototype.publish = function(data) {
  this.adaptor.publish(this.topic, data);
}
