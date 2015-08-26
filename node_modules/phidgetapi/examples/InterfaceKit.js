var Phidget = require('../phidgetapi').InterfaceKit;

var IK=new Phidget;
/*
In this example IK is a Phidget InterfaceKit 8/8/8
this same code would work for other InterfaceKits, however
the code for sensor input may never execute as those
boards may not have sensors.
*/

IK.observeOutputs(outputs);
IK.observeInputs(inputs);
IK.observeSensors(sensors);
IK.observeRawSensors(rawSensors);

IK.phidget.on(
    'phidgetReady',
    init
);

IK.phidget.connect();

function init(){
    //do some initial set up here... like blinking an led.
    setInterval(
        function(){
            if(IK.outputs[0]==0){
                IK.outputs[0]=1;
            }else{
                IK.outputs[0]=0;
            }
        },
        1000
    );
}


function sensors(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated IK data after all changes
    console.log('Sensors',IK.sensors);

    //do something with the sensor info like turn another LED on.
    if(IK.sensors[7]>500){
        IK.outputs[1]=1;
    }else{
        IK.outputs[1]=0;
    }
}

function rawSensors(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated IK data after all changes
    console.log('Raw Sensors',IK.rawSensors);
}

function outputs(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated IK data after all changes
    console.log('Outputs',IK.outputs);
}

function inputs(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated IK data after all changes
    console.log('Inputs',IK.inputs);
}
