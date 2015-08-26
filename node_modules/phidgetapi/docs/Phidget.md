# Core Phidget Module Interaction

The PhidgetsAPI package exposes a few different ways of interacting with your Phidgets. You can use the below information to create low level or custom Phidget Modules. If you create anything you think others would like, ***Please do a pull request!*** Your rockstar work could help others too. And we would be happy to help you help others!


## Methods

|method call|parameters|description|
|---|---|---|
|phidget.connect|[__phidget__.params object](#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables.  The phidgetReady event will be dispatched upon connection and initialization success. You may wish to bind other listeners to your __phidget__ inside a listener for this event.|
|phidget.set|[__phidget__.set object](#setting-information-phidgetset)|This method is used to set any output or setable device ( onboard led etc ) on your Phidget. See your __phidget__.data object for possible outputs. Remember this is case sensative so match that case exactly as it is in the __phidget__.data object for your device.
|phidget.quit| This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.on|"event name", eventHandler| this is how you bind to the phidget devices events.|

##Events

|event name| paramaters| description |
|---|---|---|
|phidgetReady||the phidget is attached and fully initialized|
|error|{ message:String, type:String  }|emitted whenever a phidget may have an error, or when it can not handle your request|
|changed|__phidget__.event|emitted whenever a phidget or sensor has data which has changed.|
|attached or added|__phidget__.data|phidget attached|
|detached or removed|__phidget__.data|phidget attached|
|log|String or Err|when rawLog set to true this event will be fired as data comes over the raw phidget socket.|
|disconnected| the phidget socket was closed or lost|

## __phidget__.event object
|key|value description|
|---|---|---|
|type| 'board' or 'output' etc. various root children of the devices __phidget__.data object.|
|key| the name of the key in the __phidget__.data[type] object |
|value| the updated value for the key|
| value of key from above | the updated value, same as the value of the above `value` key |

example :

    { 
        type: 'Sensor',
        key: '0',
        value: '109',
        '0': '109' 
    }


## Connecting & phidget.params
`phidget.connect` can be passed an a JSON object of options.  Here are the options and their defaults:

__Note on `version`__: version in this case is the version of the phidget server and associated API.  You should check your phidget server to learn the version in use.  The good news is that the APIs we are using here have not changed for the past 3 years, and appear to be unlikely to do so in the future.  If you run into errors with newer versions, please let us know, or submit a pull request with a fix.

|key|default|description|
|---|---|---|
|host    | 'localhost'| the host or ip on which your phidget webservice is running. Generally localhost unless you are connecting to a remote device running phidget.
|port    | 5001| the port on which the host is transmitting phidget data. Can be changed by using the -p flag when starting webservices, just make sure you match this port value to the -p port value if you do modify it.|
|version | '1.0.10'|older phidgetwebservice installs may require 1.0.9|
|password| null|not yet implemented|
|type    | 'PhidgetManager'| the name of the phidget type|
|serial | false| used to specify a specific board by serial number, handy when connecting to multiple boards of the same type |
|rawLog  | false| triggers the __phidget__ "log" event on any raw data from the webservice. Handy for debugging. You still need to listen for this even if you want to show the raw data though.|


	{
		host    : 'localhost',
		port    : 5001,
		version : '1.0.10',
		password: null,
		type    : 'PhidgetManager',
		boardID : 123456,
		rawLog  : false
	}


## Setting information phidget.set
|key|description|
|---|---|
|type|the key for the object your output resides ( maybe 'board', 'Output', 'Trigger' etc. check the phidget.data to see what options are available for the specific phidget you are working with )|
|key|the key of the output you wish to set|
|value|the value you wish to set|

example:

    {
        type    : 'Output',
        key     : '0',
        value   : '1'
    }

## Example Connecting to a Raw Phidget Interface Kit 8/8/8 
We designed the [InterfaceKit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/InterfaceKit.md) module so you don't need to do this, but it serves as a good example if you ever want to build a new or custom Phidget module. If you build a module for a Phidget that we don't have, or something you think is usefull, __PLEASE__ feel free to submit a pull request! We love open source contributions and want to make the best API together!

	var Phidget = require('phidgetapi').Phidget;
    
    var IK888=new phidget();
    
    IK888.on(
        "error", 
        function(data){
            console.log('error ',data);
        }
    );

    IK888.on(
        'phidgetReady',
        function(){
            console.log('IK888 phidget ready');
            console.log(IK888.data);

            IK888.set(
                {
                    type:'Output',
                    key:'0',
                    value:'1'
                }
            );

            IK888.on(
                'changed', 
                update
            );
        }
    );

    var update=function(data){
        console.log('phidget state changed');
        console.log('data ',data);

        if(data.type=='Sensor'){
            IK888.set(
                {
                    type:'Output',
                    key:'0',
                    value:'1'
                }
            );
            setTimeout(
                function(){
                    phidget.set(
                        {
                            type:'Output',
                            key:'0',
                            value:'0'
                        }
                    );
                },
                200
            );
        }
    }

    /*
    * Connect to Phidget 
    */
    IK888.connect(
        {
            type    : 'PhidgetInterfaceKit'
        }
    );

The above example will show you the available Sensors, Inputs and Outputs as well as the Triggers ( amount of change required in sensor value for a change event to be fired ) and DataRate ( sample rate in ms ) for the Phidgets Interface Kit 8/8/8. It will also cause an LED connected Output 0 and Ground to flash for 200 milliseconds upon a change in any sensor data.
