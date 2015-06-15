"use strict";

var Adaptor = lib("adaptor");

var mqtt = require("mqtt");

describe("Cylon.Adaptors.Mqtt", function() {
  var adaptor;

  beforeEach(function() {
    adaptor = new Adaptor({
      host: "host"
    });
  });

  describe("#constructor", function() {
    it("sets @host to the provided host", function() {
      expect(adaptor.host).to.be.eql("host");
    });
  });

  describe("#connect", function() {
    var client, callback;

    beforeEach(function() {
      client = { on: stub() };
      callback = spy();

      stub(mqtt, "connect").returns(client);

      adaptor.connect(callback);
    });

    afterEach(function() {
      mqtt.connect.restore();
    });

    it("connects to MQTT with the provided host", function() {
      expect(mqtt.connect).to.be.calledWith("host");
    });

    it("sets @client to the mqtt connection", function() {
      expect(adaptor.client).to.be.eql(client);
    });

    it("attaches a handler to the client", function() {
      expect(client.on).to.be.calledWith("message");
    });

    describe("when the 'message' event is triggered", function() {
      beforeEach(function() {
        adaptor.emit = spy();
        client.on.yield("topic", "message");
      });

      it("emits the 'message' event on the connection", function() {
        expect(adaptor.emit).to.be.calledWith("message", "topic", "message");
      });
    });

    it("triggers the callback", function() {
      expect(callback).to.be.called;
    });
  });

  describe("#disconnect", function() {
    var client, callback;

    beforeEach(function() {
      callback = spy();
      adaptor.client = client = { end: spy() };

      adaptor.disconnect(callback);
    });

    it("ends the client connection", function() {
      expect(client.end).to.be.called;
    });

    it("triggers the callback", function() {
      expect(callback).to.be.called;
    });
  });

  describe("#subscribe", function() {
    var client;

    beforeEach(function() {
      client = adaptor.client = { subscribe: spy() };

      adaptor.subscribe("topic");
    });

    it("tells the client to subscribe to a topic", function() {
      expect(client.subscribe).to.be.calledWith("topic");
    });
  });

  describe("#publish", function() {
    var client;

    beforeEach(function() {
      client = adaptor.client = { publish: spy() };

      adaptor.publish("topic", "message");
    });

    it("tells the client to publish a message to a topic", function() {
      expect(client.publish).to.be.calledWith("topic", "message");
    });
  });
});
