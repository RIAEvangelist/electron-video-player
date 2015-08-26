# nodejs Phidgets API
_A node.JS API for interacting with all official Phidget boards as well as your own analog sensors_. This module is compatible with all operating systems which can run node.js. phidgetsapi is perfect for projects using BeagleBone Black and Raspberry Pi too!

## PHIDGETS
[Phidget boards](http://http://www.phidgets.com/) are a great prototyping tool which can handle digital inputs and outputs, along with a great array of analog sensors (RFID, temperature, accellerometer, servo motors etc).

## Phidget Server Requirement
This project assumes you have the Phidget server up and running.  For most "regular" (USB) Phidget boards, that assumes that the computer or SBC (BeagleBone Black, Raspberry Pi etc.) you have connected to the Phidget board via USB has the webservice up and running.  For stand-alone Phidget micro-computers (phidgetsbc), this assumes you have configured the server via the web portal.  You will be connecting to the Phidget server via TCP, so be sure you can access the server from the machine running this project.

For a guide on installing the required libraries and services on your platform, see the below wikis

1. [Linux](http://www.phidgets.com/docs/OS_-_Linux)
2. [Mac OS X](http://www.phidgets.com/docs/OS_-_OS_X)
3. [Windows](http://www.phidgets.com/docs/OS_-_Windows)

## Installation
#NPM
* npm install phidgetapi  

[![phidgetapi npm version](https://badge.fury.io/js/phidgetapi.svg)](https://www.npmjs.com/package/phidgetapi)

[![phidgetapi Package Quality](http://npm.packagequality.com/badge/phidgetapi.png)](https://www.npmjs.com/package/phidgetapi)


#GIT
* git clone git://github.com/RIAEvangelist/node-phidget-API.git
OR
* git clone https://github.com/RIAEvangelist/node-phidget-API.git

#Module Documentation
* [Core Phidget Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)
* [Manager Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Manager.md)
* [GPS Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/GPS.md)
* [InterfaceKit Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/InterfaceKit.md)
* [RFID Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/RFID.md)
* [Servo Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Servo.md)
* [Spatial Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Spatial.md)

## ToDo:
* Support for Phidget authentication
* create modules for handling all phidget types
* create more examples for various Phidgets
* write tests for all phidget modules