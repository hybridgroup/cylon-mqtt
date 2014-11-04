"use strict";

var module = source("cylon-mqtt");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("Cylon.MQTT", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['mqtt']);
    });
  });

  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      expect(module.drivers).to.be.eql(['mqtt']);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: { connection: 'test' } };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(module.adaptor()).to.be.instanceOf(Adaptor);
    });
  });
});
