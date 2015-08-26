var Phidget=require('./Phidget.js').Phidget;

function GPS(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetGPS'
            },
            date:{
                enumerable:true,
                get:date
            },
            heading:{
                enumerable:true,
                get:heading
            },
            velocity:{
                enumerable:true,
                get:velocity
            },
            alt:{
                enumerable:true,
                get:alt
            },
            lat:{
                enumerable:true,
                get:lat
            },
            lon:{
                enumerable:true,
                get:lon
            },
            fixed:{
                enumerable:true,
                get:fixed
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

    var position = {};

    phidget.params={
        type:this.type
    }

    function observe(callback){
        if(typeof callback != 'function'){
            throw('GPS.observe requires a callback function as paramater');
        }
        Object.observe(position,callback);
    }

    //Getters
    /*
        Property: PositionFixStatus
        Gets the position fix status of this gps.
    */
    function fixed(){
        return position.fix
    }
    /*
        Property: Latitude
        Gets the last recieved latitude.
    */
    function lat(){
        return position.lat;
    }
    /*
        Property: Longitude
        Gets the last recieved longitude.
    */
    function lon(){
        return position.lon;
    }
    /*
        Property: Altitude
        Gets the last recieved altitude.
    */
    function alt(){
        return position.alt;
    }
    /*
        Property: heading
        Gets the last recieved heading.
    */
    function heading(){
        return position.heading;
    }
    /*
        Property: Velocity
        Gets the last recieved velocity.
    */
    function velocity(){
        return position.velocity;
    }
    /*
        Property: date
        Gets the last recieved date and time in UTC.
    */
    function date(){
        return position.date;
    }



    function update(data){
        var timestamp=new Date().getTime();

        switch(data.key){
            case 'PositionFix':
                position.fix=Number(data.value);
                break;
            case 'Velocity':
                position.velocity = Number(data.value);
                break;
            case 'Heading':
                position.heading = Number(data.value);
                break;
            case 'DateTime':
                var data = data.value.split('/');
                date = new Date();
                date.setUTCFullYear(
                    Number(data[0]),
                    Number(data[1])-1,
                    Number(data[2])
                );
                date.setUTCHours(
                    Number(data[3]),
                    Number(data[4]),
                    Number(data[5]),
                    Number(data[6])
                );
                position.date={
                    systemOffset:date.getTime()-timestamp,
                    timestamp:date.getTime(),
                    full:date.toLocaleString(),
                    year:Number(data[0]),
                    month:Number(data[1])-1,
                    day:Number(data[2]),
                    hour:Number(data[3]),
                    min:Number(data[4]),
                    sec:Number(data[5]),
                    ms:Number(data[6])
                }
                break;
            case 'Position':
                var data = data.value.split('/');
                position.lat = Number(data[0]);
                position.lon = Number(data[1]);
                position.alt = Number(data[2]);
                break;
        }
    }

    phidget.on(
        'log',
        function(data){
            //pass log up
            //console.log('log ',data);
        }
    );

    phidget.on(
        'error',
        function(data){
            //throw err
            //console.log('error ',data);
        }
    );

    phidget.on(
        'changed',
        update
    );

    phidget.on(
        'phidgetReady',
        function(data){
            //console.log('ready',data)

        }
    );


    return this;
}

exports.Phidget=GPS;
