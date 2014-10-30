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

  var extraParams = opts.extraParams || {};
  this.topic = extraParams.topic;
  this.commands = {
    publish: this.publish
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  var self = this;
  this.adaptor.subscribe(this.topic);

  this.adaptor.client.on('message', function(topic, message) {
    if (topic == self.topic) {
      self.device.emit('message', message);
    }
  });

  callback(null);
};

Driver.prototype.halt = function(callback) {
  callback(null);
};

Driver.prototype.publish = function(topic, data) {
  this.adaptor.publish(topic, data);
}
