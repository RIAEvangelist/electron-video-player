var Phidget = require('phidgetapi').RFID;

var RFID=new Phidget;

RFID.observeBoard(update);

RFID.phidget.on(
    'phidgetReady',
    function(){
        //turn on the antenna when available and blink the LED so we know it is ready.
        RFID.antennaOn=1;
        RFID.LEDOn=1;
        setTimeout(
            function(){
                RFID.LEDOn=0;
            },
            250
        )
    }
);

RFID.phidget.connect();

function update(changes){
     for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }
    console.log(JSON.stringify(RFID));
    //light the LED while the tag is present
    if(RFID.tagState==1 && RFID.LEDOn==0 && RFID.tag2.tag){
        RFID.LEDOn=1;
        console.log(RFID.tag2.tag);
    }

    //turn off the LED if no tag is present
    if(RFID.tagState==0){
        RFID.LEDOn=0;
    }
    
}