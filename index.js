"use strict";

var Service, Characteristic;
var exec = require('child_process').exec;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-cmdtrigger", "CmdTrigger", CmdTrigger);
}

function CmdTrigger(log, config) {
  this.log = log;
  this.name = config.name;
  this.command = config.command;

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

CmdTrigger.prototype.getServices = function() {
  return [this._service];
}

CmdTrigger.prototype._setOn = function(on, callback) {
  if (on) {
    //Execute command from config file
    exec(this.command);
    this.log("Command executed: '" + this.command + "'");
    //Turn off switch again after 500ms
    setTimeout(function() {
      this._service.setCharacteristic(Characteristic.On, false);
    }.bind(this), 500);
  }
  callback();
}
