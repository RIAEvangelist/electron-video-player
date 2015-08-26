var Phidget = require('phidgetapi').phidget;

var motor = new Phidget();

motor.on(
    "log",
    function(data){
        console.log('log ',data);
    }
);

motor.on("error", function (data) {
    console.log('error ', data);
});

*
 * Detecting status change for both Re-Attach and Detach
 */
motor.on(
    'changed',
    function(data){
        console.log('phidget status changed');
        console.log('data ',data);

    }
);

/*
 * Detecting Phidget Detach
 */
motor.on(
    'changed',
    function(data){
        console.log('changed data ',data);

    }
);

motor.on('phidgetReady', function () {
    console.log('PhidgetMotorControl ready');
    console.log(motor.data);
    //Turn the BackEMFSensingState on\1 or off\0
    motor.set({
        type: 'BackEMF',
        key: '0',
        value: '0'
    });

    //Velocity is the percentage of time the motor is being powered for. The PhidgetMotorControl rapidly switches power to the motor on/off. Velocity can be set between –100 and +100. –100 corresponds to the motor being         //driven 100% of the time in reverse, +100 driven 100% of the time forward. When velocity is 0, the motor is controlled by the Braking property, which defaults to 0%.
    //Values  0f -100 to 100 sent as a float.
    motor.set({
        type: 'Velocity',
        key: '0',
        value: parseFloat(100)
    });

    //Returns how fast a motor will be accelerated between given velocities. The valid range is between AccelerationMax and AccelerationMin. Acceleration is in %(duty cycle)/s
    //AccelerationMax is a constant = 6250% Duty Cycle/s
    //AccelerationMin is a constant = 24.51% Duty Cycle/s
    motor.set({
        type: 'Acceleration',
        key: '0',
        value: parseFloat(6250)
    });

    //Sets the braking amount for a motor at rest, with a range of 0-100%. Braking is only active when the motor velocity is 0. By default, braking is 0%, allowing the motor to coast (free-wheel).
    //The holding strength of a braked motor depends on the motor, but is generally quite low.
    //Values 0 - 100 sent as a float
    motor.set({
        type: 'Braking',
        key: '0',
        value: parseFloat(6250)
    });


    //Sets the ratiometric state for the analog sensor inputs. Defaults to true.
    motor.set({
        type: 'board',
        key: 'Ratiometric',
        value: '1'
    });


    motor.on('changed', function (data) {
        console.log('motor state changed', data);
    });
});



motor.connect({
    host: 127.0.0.1,
    port: 5001,
    version: '1.0.10', //older phidgetwebservice installs may require 1.0.9
    password: null,
    type: 'PhidgetMotorControl',
    boardID: 123456,
    rawLog: false
});


/*

Example motor.data from a Phidget Motor Controller 1-motor board

PhidgetMotorControl ready { boardID: '123456',
  board:
   { Version: '101',
     SupplyVoltage: '1.203100E+01',
     Status: 'Attached',
     Ratiometric: '1',
     NumberOfSensors: '2',
     NumberOfMotors: '1',
     NumberOfInputs: '2',
     Name: 'Phidget Motor Controller 1-motor',
     Label: '',
     InitKeys: '26',
     ID: '62',
     AccelerationMin: '2.451000E+01',
     AccelerationMax: '6.250000E+03' },
  Velocity: { '0': '-0.000000E+00' },
  Sensor: { '0': '0', '1': '0' },
  RawSensor: { '0': '0', '1': '0' },
  Input: { '0': '0', '1': '0' },
  EncoderPositionUpdate: { '0': '0' },
  CurrentUpdate: { '0': '0.000000E+00' },
  Current: { '0': '0.000000E+00' },
  Braking: { '0': '0.000000E+00' },
  BackEMFState: { '0': '0' },
  BackEMF: { '0': '1.000000E+300' },
  Acceleration: { '0': '6250' } }


Example event data, the board is quite chatty even when the motor is at rest.

Motor current change
motor state changed { '0': '0.000000E+00',  type: 'CurrentUpdate',  key: '0',  value: '0.000000E+00' }

Encoder position change
motor state changed { '0': '0',  type: 'EncoderPositionUpdate',  key: '0',  value: '0' }

Analogue Inputs
motor state changed { '1': '0',  type: 'RawSensor',  key: '1',  value: '0' }
motor state changed { '1': '0', type: 'Sensor', key: '1', value: '0' }
motor state changed { '0': '0', type: 'Sensor', key: '0', value: '0' }
motor state changed { '0': '0',  type: 'RawSensor',  key: '0',  value: '0' }

Digital Inputs - only seen if you have something conected
motor state changed { '0': '0', type: 'Input', key: '0', value: '0' }
motor state changed { '0': '0', type: 'Input', key: '1', value: '0' }

*/
