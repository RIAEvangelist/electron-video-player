var Phidget = require('../phidgetapi').Servo;

var servo=new Phidget();
var motor;

servo.observe(moved)

servo.phidget.on(
    'phidgetReady',
    function(){
        servo.engaged[0]=1; //turn motor on, automatic on most servos
        servo.positions[0]=0; //zero motor position

        setTimeout(
            moveTo180,
            500
        );

        setTimeout(
            powerdown,
            1000
        );
    }
);

function moved(changes){
    console.log('moved to', servo.positions[0]);
}

function moveTo180(){
    servo.positions[0]=180;
}

function powerdown(){
    //this will stop servo from moving if it has not completed its motion.
    servo.engaged[0]=1; //fake a hard power up just to be sure servo listens to power off command
    servo.engaged[0]=0; //power off
}

servo.phidget.connect();
