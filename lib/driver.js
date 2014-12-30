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

  this.events = [

    /**
     * Emitted when the MQTT client receives a new message on the Driver's topic
     *
     * @event message
     * @value message
     */
    "message"
  ];
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.connection.subscribe(this.topic);

  this.connection.on('message', function(topic, message) {
    if (topic === this.topic) {
      this.emit('message', message);
    }
  }.bind(this));

  callback(null);
};

Driver.prototype.halt = function(callback) {
  callback(null);
};

/**
 * Publishes a new message on the Driver's topic
 *
 * @param {Object|String} data the data to publish to the topic
 * @return {null}
 * @publish
 */
Driver.prototype.publish = function(data) {
  this.connection.publish(this.topic, data);
}
