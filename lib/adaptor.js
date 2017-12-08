/*
 * cylon-mqtt adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014-2016 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var Cylon = require("cylon");
var mqtt = require("mqtt");

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.host = opts.host;
  this.additionalOpts = {};
  this.additionalOpts.username = opts.username;
  this.additionalOpts.password = opts.password;
  if (opts.clientId) {
    this.additionalOpts.clientId = opts.clientId;
  }

  if (opts.protocolId) {
    this.additionalOpts.protocolId = opts.protocolId;
  }

  if (opts.protocolVersion) {
    this.additionalOpts.protocolVersion = opts.protocolVersion;
  }

  if (opts.rejectUnauthorized) {
    this.additionalOpts.rejectUnauthorized = opts.rejectUnauthorized;
  }


  this.subscriptions = [
    /**
     * Subscription list is initially empty
     */
  ];

  this.events = [

    /**
     * Emitted when the MQTT client receives a new message
     *
     * @event message
     * @value topic
     * @value message
     */
    "message"
  ];
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  this.client = mqtt.connect(this.host, this.additionalOpts);

  this.client.on("message", function(topic, message) {
    this.emit("message", topic, message);
  }.bind(this));

  this.client.on("reconnect", function() {
    for (var i in this.subscriptions) {
      this.client.subscribe.apply(this.client, this.subscriptions[i]);
    }
  }.bind(this));

  callback(null);
};

Adaptor.prototype.disconnect = function(callback) {
  this.client.end();

  callback(null);
};

/**
 * Subscribes to messages on the given topic
 *
 * @param {String|Array|Object} topic which topic(s) to subscribe to
 * @param {Object} options options for the MQTT subscription
 * @param {Function} [callback] triggered on suback with (err, granted)
 * @return {void}
 * @publish
 */
Adaptor.prototype.subscribe = function() {
  this.client.subscribe.apply(this.client, arguments);
  this.subscriptions.push(arguments);
};

/**
 * Publishes data to a topic
 *
 * @param {String} topic which topic to publish to
 * @param {Object|String} data the data to publish to the topic
 * @param {Object} [opts] - publish options, includes:
 *    {Number} qos - qos level to publish on
 *    {Boolean} retain - whether or not to retain the message
 * @return {void}
 * @publish
 */
Adaptor.prototype.publish = function(topic, data, opts) {
  this.client.publish(topic, data, opts);
};
