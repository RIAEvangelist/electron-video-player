var Phidget=require('./Phidget.js').Phidget;
var ServoParams=require('./ServoParams.js').ServoParams;

function Servo(){
    var phidget=new Phidget;
    var positions=[];
    var engaged=[];
    var positionMax=[];
    var positionMin=[];
    var servoParameters=[];

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetServo'
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
            },
            positionMaxLimit:{
                enumerable:true,
                get:positionMaxLimit
            },
            positionMinLimit:{
                enumerable:true,
                get:positionMaxLimit
            },
            numberOfMotors:{
                enumerable:true,
                get:numberOfMotors
            },
            engaged:{
                enumerable:true,
                writable:true,
                value:engaged
            },
            positions:{
                enumerable:true,
                writable:true,
                value:positions
            },
            positionMax:{
                enumerable:true,
                writeable:false,
                value:positionMax
            },
            positionMin:{
                enumerable:true,
                writeable:false,
                value:positionMin
            },
            servoParameters:{
                enumerable:true,
                writeable:false,
                value:servoParameters
            }
        }
    );

    phidget.params={
        type:this.type
    }

    Object.observe(
        positions,
        setPosition
    );

    Object.observe(
        engaged,
        setEngaged
    );

    function observe(callback){
        if(typeof callback != 'function'){
            throw('RFID.observe requires a callback function as paramater');
        }

        Object.observe(
            positions,
            callback
        );
    }

    function setEngaged(changes){
        for(var i in changes){
            var change=changes[i];
            for(var i=0; i<changes.length; i++){
                var change=changes[i];
                if(change.type!='update' || change.name=='length'){
                    continue;
                }

                phidget.set(
                    {
                        type:'Engaged',
                        key:change.name.toString(),
                        value:change.object[change.name].toString()
                    }
                );
            }
        }
    }

    function setPosition(changes){
        for(var i in changes){
            var change=changes[i];
            for(var i=0; i<changes.length; i++){
                var change=changes[i];
                if(change.type!='update' || change.name=='length'){
                    continue;
                }

                var servoParam=servoParameters[change.name];
                var value=servoParam.degreesToUs(
                    change.object[change.name]
                );

                phidget.set(
                    {
                        type:'Position',
                        key:change.name.toString(),
                        value:value.toString()
                    }
                );
            }
        }
    }

    function positionMaxLimit(){
        return Number(phidget.data.board.PositionMaxLimit);
    }

    function positionMinLimit(){
        return Number(phidget.data.board.PositionMinLimit);
    }

    function numberOfMotors(){
        return Number(phidget.data.board.NumberOfMotors);
    }

    function engaged(){
        return engaged;
    }

    function servoParameters(){
        return Number(phidget.data.board.ServoParameters);
    }

    function update(data){
        switch(data.type){
            case 'Engaged' :
                engaged[Number(data.key)]=Number(data.value);
                break;
            case 'Position' :
                var key=Number(data.key);
                if(!servoParameters[key]){
                    break;
                }
                positions[key]=servoParameters[key].usToDegrees(Number(data.value));
                break;
            case 'ServoParameters' :
                var paramData = data.value.split(',');
                var index=Number(data.key);

                for(var i=0; i<paramData.length; i++){
                    paramData[i]=Number(paramData[i]);
                }

                servoParameters[index] = new ServoParams(
                    paramData[0],
                    paramData[1],
                    paramData[2],
                    paramData[3],
                    0
                );

                positionMax[index] = servoParameters[index].usToDegrees(paramData[1]);;
                positionMin[index] = servoParameters[index].usToDegrees(paramData[0]);

                if(paramData[1] > positionMaxLimit()){
                    positionMax[index] = servoParameters[index].usToDegrees(positionMaxLimit());
                }

                break;
        }
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
        'changed',
        update
    );

    phidget.on(
        'phidgetReady',
        function(){
            var params=Object.keys(phidget.data.ServoParameters);
            for(var i=0; i<params.length;i++){
                var key=params[i];
                update(
                    {
                        type:'ServoParameters',
                        key:key,
                        value:phidget.data.ServoParameters[key]
                    }
                );

                update(
                    {
                        type:'Position',
                        key:key,
                        value:phidget.data.Position[key]
                    }
                );

                update(
                    {
                        type:'Engaged',
                        key:key,
                        value:phidget.data.Engaged[key]
                    }
                );
            }
        }
    );

    return this;
}

exports.Phidget=Servo;
