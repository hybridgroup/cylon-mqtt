/*
 * cylon-mqtt adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
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

  callback(null);
};

Adaptor.prototype.disconnect = function(callback) {
  this.client.end();

  callback(null);
};

/**
 * Subscribes to messages on the given topic
 *
 * @param {String} topic which topic to subscribe to
 * @return {null}
 * @publish
 */
Adaptor.prototype.subscribe = function(topic) {
  var args = Array.prototype.slice.call(arguments);
  if (args.length > 1) {
    mqtt.MqttClient.prototype.subscribe.apply(this.client, args);
  }
  else {
    this.client.subscribe(topic);
  }


};

/**
 * Publishes data to a topic
 *
 * @param {String} topic which topic to publish to
 * @param {Object|String} data the data to publish to the topic
 * @return {null}
 * @publish
 */
Adaptor.prototype.publish = function(topic, data) {
  this.client.publish(topic,data);
};
