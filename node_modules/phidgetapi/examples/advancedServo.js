var phidget = require('../phidgetapi').phidget;

var motor=new phidget();

motor.on(
    "log",
    function(data){
        console.log('log ',data);
    }
);

motor.on(
    "error",
    function(data){
        console.log('error ',data);
    }
);

/*
 * Detecting status change for both Re-Attach and Detach
 */
motor.on(
    'changed',
    function(data){
        console.log('phidget status changed');
        console.log('data ',data);

    }
);

motor.on(
    'phidgetReady',
    function(){
        console.log('motor ready');
        console.log(motor.data);
        motor.set(
            {
                type:'Engaged',
                key:'0',
                value:'1'
            }
        );
        motor.set(
            {
                type:'Position',
                key:'0',
                value:'2.200000E+03'
            }
        );
        setTimeout(
            function(){
                motor.set(
                    {
                        type:'Position',
                        key:'0',
                        value:'2.500000E+03'
                    }
                )
            },
            1000
        );
    }
);


/*
 * Connect to motor
 *
 */

motor.connect(
    {
        type: 'PhidgetAdvancedServo'
    }
);

/*
 * an example of how to see the data being transferred to and from the phidget
 *
 * motor.connect(
 *      {
 *          rawLog:true
 *      }
 * );
 *
 */
