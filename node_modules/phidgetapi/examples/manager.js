var Manager = require('../phidgetapi').Manager;

var manager=new Manager;

manager.observe(update);

function update(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each phidget
        //console.log(change);
    }

    //see latest info on all available phidgets
    console.log(manager.devices);
}

manager.phidget.connect();
