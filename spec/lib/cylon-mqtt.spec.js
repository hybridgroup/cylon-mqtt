"use strict";

var mqtt = lib("../");

var Adaptor = lib("adaptor"),
    Driver = lib("driver");

describe("Cylon.MQTT", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(mqtt.adaptors).to.be.eql(["mqtt"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(mqtt.drivers).to.be.eql(["mqtt"]);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: { connection: "test" } };
      expect(mqtt.driver(args)).to.be.instanceOf(Driver);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(mqtt.adaptor()).to.be.instanceOf(Adaptor);
    });
  });
});
