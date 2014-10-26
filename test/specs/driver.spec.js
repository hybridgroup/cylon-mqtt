'use strict';

var Cylon = require('cylon');

var Mqtt = source("driver");

describe("Cylon.Drivers.Mqtt", function() {
  var driver;

  beforeEach(function() {
    driver = new Mqtt({
      device: { connection: {} }
    });
  });

  it("is a subclass of Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(Mqtt);
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
  });
});
