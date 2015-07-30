/*
 * cylon-mqtt driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var Cylon = require("cylon");

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

  this.connection.on("message", function(topic, message) {
    if (topic === this.topic) {
      this.emit("message", message);
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
 * @param {Object} [opts] - publish options, includes:
 *    {Number} qos - qos level to publish on
 *    {Boolean} retain - whether or not to retain the message
 * @return {void}
 * @publish
 */
Driver.prototype.publish = function(data, opts) {
  this.connection.publish(this.topic, data, opts);
};
