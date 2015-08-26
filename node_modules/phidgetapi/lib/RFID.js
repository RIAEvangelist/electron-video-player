var Phidget=require('./Phidget.js').Phidget;

function RFID(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetRFID'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writeable:true
            },
            observeBoard:{
                enumerable:true,
                writable:false,
                value:observeBoard
            },
            observeOutputs:{
                enumerable:true,
                writable:false,
                value:observeOutput
            },
            numberOfOutputs:{
                enumerable:true,
                get:getNumberOfOutputs
            },
            antennaOn:{
                enumerable:true,
                get:getAntennaOn,
                set:setAntennaOn
            },
            LEDOn:{
                enumerable:true,
                get:getLEDOn,
                set:setLEDOn
            },
            lastTag:{
                enumerable:true,
                get:getLastTag
            },
            tagState:{
                enumerable:true,
                get:getTagState
            },
            tag2:{
                enumerable:true,
                get:getTag2
            },
            tagLoss2:{
                enumerable:true,
                get:getTagLoss2
            },
            outputs:{
                enumerable:true,
                get:getOutputs
            }
        }
    );

    var board={
        AntennaOn:0,
        LEDOn:0,
        LastTag:{},
        TagState:0,
        Tag2:{},
        TagLoss2:{}
    }

    var Output=[];

    phidget.params={
        type:this.type
    }

    Object.observe(
        Output,
        setOutputs
    );

    function showTag(changes){
        var tag2=phidget.data.board.Tag2.split('/');
        board.Tag2={
            protocol:tag2[0],
            tag:tag2[1]
        };

        var lastTag=phidget.data.board.LastTag.split('/');
        var tagLoss2=phidget.data.board.TagLoss2.split('/');
        board.LastTag={
            protocol:lastTag[0],
            tag:lastTag[1]
        };
        board.TagLoss2={
            protocol:tagLoss2[0],
            tag:tagLoss2[1]
        };
    }

    function getNumberOfOutputs(){
        return Number(phidget.data.board.NumberOfOutputs);
    }

    function getOutputs(){
        return Output;
    }

    function getTag2(){
        return board.Tag2;
    }

    function getTagLoss2(){
        return board.TagLoss2;
    }

    function getAntennaOn(){
        return board.AntennaOn;
    }

    function setAntennaOn(value){
        phidget.set(
            {
                type:'board',
                key:'AntennaOn',
                value:value.toString()
            }
        );
        return;
    }

    function getLEDOn(){
        return board.LEDOn;
    }

    function setLEDOn(value){
        phidget.set(
            {
                type:'board',
                key:'LEDOn',
                value:value.toString()
            }
        );

        board.LEDOn=value;
        return;
    }

    function getLastTag(){
        return board.LastTag;
    }

    function getTagState(){
        return board.TagState;
    }

    function observeBoard(callback){
        if(typeof callback != 'function'){
            throw('RFID.observeBoard requires a callback function as paramater');
        }

        Object.observe(
            board,
            callback
        );
    }

    function observeOutput(callback){
        if(typeof callback != 'function'){
            throw('RFID.observeOutputs requires a callback function as paramater');
        }

        Object.observe(
            Output,
            callback
        );
    }

    function setOutputs(changes){
        for(var i=0; i<changes.length; i++){
            var change=changes[i];
            if(change.type!='update' || change.name=='length'){
                continue;
            }

            phidget.set(
                {
                    type:'Output',
                    key:change.name.toString(),
                    value:change.object[change.name].toString()
                }
            );
        }
    }

    function update(data){
        switch(data.type){
            case 'Output' :
                Output[Number(data.key)]=Number(data.value);
                break;
            case 'board' :
                switch(data.key){
                    case 'LastTag' :
                    case 'Tag2' :
                    case 'TagLoss2' :
                        var tag=data.value.split('/')
                        board[data.key]={
                            protocol:tag[0],
                            tag:tag[1]
                        };
                        break;
                    default :
                        board[data.key]=Number(data.value);
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
        function(data){
            if(phidget.data.board.NumberOfOutputs){
                for(var i=0; i<phidget.data.board.NumberOfOutputs; i++){
                    if(Output[i]){
                        continue;
                    }

                    Output[i]=0;
                }
            }

            Object.observe(
                phidget.data.board,
                showTag
            );
        }
    );

    return this;
}

exports.Phidget=RFID;
