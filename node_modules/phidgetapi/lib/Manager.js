var Phidget=require('./Phidget.js').Phidget;

function Manager(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetManager'
            },
            devices:{
                enumerable:true,
                get:devices
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writeable:true
            },
            observe:{
                enumerable:true,
                writable:false,
                value:observe
            }
        }
    );

    phidget.params={
        type:this.type
    }

    function devices(){
        return phidget.data;
    }

    function observe(callback){
        if(typeof callback != 'function'){
            throw('Manager.observe requires a callback function as paramater');
        }
        Object.observe(phidget.data,callback);
    }

    function attached(data){
        //great;
    }

    function detached(data){
        delete phidget.data[data.type][data.serial];
    }

    function checkAttached(data){
        if(data.attached){
            attached(data);
            return;
        }

        detached(data);
    }

    phidget.on(
        'log',
        function(data){
            //log it?
            //console.log('log ',data);
        }
    );

    phidget.on(
        'error',
        function(data){
            //throw it?
            //console.log('error ',data);
        }
    );

    phidget.on(
        'added',
        attached
    );

    phidget.on(
        'attached',
        attached
    );

    phidget.on(
        'changed',
        checkAttached
    );

    phidget.on(
        'detached',
        detached
    );

    phidget.on(
        'removed',
        detached
    );

    return this;
}

exports.Manager=Manager;
