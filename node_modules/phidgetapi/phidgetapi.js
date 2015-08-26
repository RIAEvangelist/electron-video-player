/*
 * Phidget Interface for node.js
 * Brandon Miller
 *
 * June 2012
 *
 */
var Phidget = require('./lib/Phidget.js').Phidget;
var Manager = require('./lib/Manager.js').Manager;
var GPS     = require('./lib/GPS.js').Phidget;
var InterfaceKit = require('./lib/InterfaceKit.js').Phidget;
var RFID = require('./lib/RFID.js').Phidget;
var Spatial = require('./lib/Spatial.js').Phidget;
var Servo = require('./lib/Servo.js').Phidget;

exports.Phidget = Phidget;
exports.Manager = Manager;
exports.GPS     = GPS;
exports.InterfaceKit=InterfaceKit;
exports.RFID    = RFID;
exports.Spatial = Spatial;
exports.Servo = Servo;

//backwards compatibilirty only below
exports.phidget = Phidget;
