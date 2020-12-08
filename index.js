"use strict";

var Service, Characteristic, HomebridgeAPI;

var exec = require('child_process').exec;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-cmdtrigger", "CmdTrigger", CmdTrigger);
}

function CmdTrigger(log, config) {
  this.log = log;
  this.name = config.name;
  this.command = config.command ? config.command : "echo HelloWorld";
  this.stateful = config.stateful;
  this.delay = config.delay ? config.delay : 800;
  this.execAfterDelay = config.execAfterDelay
  this._service = new Service.Switch(this.name);
  
  this.cacheDirectory = HomebridgeAPI.user.persistPath();
  this.storage = require('node-persist');
  this.storage.initSync({dir:this.cacheDirectory, forgiveParseErrors: true});
  
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));

  if (this.stateful) {
	var cachedState = this.storage.getItemSync(this.name);
	if((cachedState === undefined) || (cachedState === false)) {
		this._service.setCharacteristic(Characteristic.On, false);
	} else {
		this._service.setCharacteristic(Characteristic.On, true);
	}
  }
}

CmdTrigger.prototype.getServices = function() {
  return [this._service];
}


CmdTrigger.prototype._setOn = function(on, callback) {
 this.log("Setting '" + this.name + "' " + on);
  if (on && !this.stateful) {
    if (!this.execAfterDelay) {
      //Execute command from config file and turn switch off again after configured delay
      exec(this.command);
      this.log("Command executed: '" + this.command + "'");
      setTimeout(function() {
        this._service.setCharacteristic(Characteristic.On, false);
      }.bind(this), this.delay);
    }
    else{
      //Execute command after configured delay and turn switch off again
      setTimeout(function() {
        exec(this.command);
        this.log("Command executed: '" + this.command + "'");
        this._service.setCharacteristic(Characteristic.On, false);
      }.bind(this), this.delay);
    }
  }
  
  if (this.stateful) {
	this.storage.setItemSync(this.name, on);
  }

  callback();
}
