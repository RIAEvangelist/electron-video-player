var Phidget = require('../phidgetapi.js').Spatial;

var spatial=new Phidget;
spatial.observeGyro(gyro);
spatial.observeAcceleration(accel);
spatial.observeMagneticField(mag);

function gyro(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated Spatial data after all changes
    //console.log(changes[changes.length-1].object);

    //Or just the info you care about
    console.log('gyro : ',spatial.gyro);
}

function accel(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated Spatial data after all changes
    //console.log(changes[changes.length-1].object);

    //Or just the info you care about
    console.log('accel : ',spatial.acceleration);
}

function mag(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated Spatial data after all changes
    //console.log(changes[changes.length-1].object);

    //Or just the info you care about
    console.log('magnetic field : ',spatial.magneticField);
}

spatial.phidget.connect();
