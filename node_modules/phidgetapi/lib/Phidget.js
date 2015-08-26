/*
 * Phidget Interface for nodeJS
 * Brandon Miller
 *
 * June 2012
 *
 */
var net = require('net');
var EventEmitter = require('events').EventEmitter;

function Phidget(){
    var phidget = new EventEmitter;
    Object.defineProperties(
        phidget,
        {
            rate:{
                get:getRate,
                set:setRate,
                enumerable:true
            },
            data:{
                enumerable:true,
                value:{
                    serial:'',
                    board:{}
                }
            },
            defaults:{
                enumerable:true,
                writeable:false,
                value:{
                    host    : 'localhost',
                    port    : 5001,
                    version : '1.0.10',//older phidgetwebservice21 builds may require 1.0.9
                    password: false,
                    rawLog  : false,
                    type    : 'PhidgetManager',
                    serial  : false,
                    label   : false,
                    rate    : 8 //sampling rate in ms
                }
            },
            client:{
                enumerable:false,
                writable:true,
                value:{}
            },
            connect:{
                writeable:false,
                enumerable:true,
                value:connect
            },
            connected:{
                writeable:false,
                enumerable:true,
                value:connected
            },
            params:{
                enumerable:true,
                get:getParams,
                set:setParams
            },
            set:{
                enumerable:true,
                writable:false,
                value:set
            },
            quit:{
                enumerable:true,
                writeable:false,
                value:quit
            },
            disconnected:{
                enumerable:false,
                writeable:false,
                value:disconnected
            },
            label:{
                get:getLabel,
                set:setLabel
            }
        }
    );

    var phidgetParams={};
    var socketDataString='';

    function getParams(){
        return phidgetParams;
    }

    function getLabel(){
        return phidget.data.board.label;
    }

    function setParams(params){
        for(var key in params){
            if(!phidgetParams[key])
                phidgetParams[key]=params[key];
        }
        for(var key in this.defaults){
            if(!phidgetParams[key])
                phidgetParams[key]=this.defaults[key];
        }

        if(this.params.boardID){
            phidgetParams.serial=this.params.boardID;
        }
    }

    function setLabel(value){
        this.set(
            {
                type:'board',
                key:'Label',
                value:value
            }
        )
    }

    function connect(params, callback){
        this.params = params;

        this.client = net.createConnection(
            this.params.port,
            this.params.host,
            this.connected
        );

        this.client.on(
            'error',
            function(data){
                phidget.emit(
                    'error',
                    data
                );
            }
        );
    };

    function update(buffer){
        var lines,
            chunk,
            data={};

        socketDataString += buffer.toString('utf8');

        if(this.params.rawLog)
            this.emit(
                'log',
                socketDataString
            );


        if(socketDataString.indexOf('\n')<0)
            return;

        lines = socketDataString;
        socketDataString='';

        lines = lines.replace(/[\u0000\u0001]/gi, '');
        lines = lines.split('\n');

        for( index in lines ){
            chunk=lines[index].split('key ')[1];
            if(!chunk){
                if(!this.ready && lines[index] == 'report 200-that\'s all for now'){
                    this.ready = true;
                    this.emit('phidgetReady');
                }
                continue;
            }
            chunk=chunk.split(' latest value ');
            if(!chunk[1]){
                continue;
            }
            chunk[0]=chunk[0].split('/');
            chunk[1]=chunk[1].split('"');
            chunk[2]=chunk[1][1];
            if(!chunk[1][2])
                chunk[1][2]='undefinedEvent';
            chunk[3]=chunk[1][2].replace(/[\s()]/ig,'');
            chunk[4]=chunk[0][4];
            chunk[1]=chunk[0].pop();
            chunk[0]=chunk[0].pop();

            /*
            console.log(lines[index])
            console.log(chunk)
            console.log('\n')
            */

            if(!this.data.serial)
                this.data.serial=chunk[4];

            if(this.data.serial==chunk[0])
                chunk[0]='board';

            if(!this.data[chunk[0]])
                this.data[chunk[0]]={};

            this.data[chunk[0]][chunk[1]]=chunk[2];

            var e={
                type:chunk[0],
                key:chunk[1],
                value:chunk[2]
            }

            if(this.params.type=='PhidgetManager'){
                var managerData=chunk[2].split(' ');
                e={
                    attached    : (managerData[0]=='Attached'),
                    id          : managerData[2].split('=')[1],
                    label       : managerData[3].split('=')[1],
                    serial      : chunk[1],
                    type        : chunk[0]
                }
                this.emit(
                    managerData[0].toLowerCase(),
                    e
                );
                this.data[chunk[0]][chunk[1]]=e;
            }

            e[chunk[1]]=chunk[2];

            this.emit(
                chunk[3],
                e
            );
        }
    };

    function set(params){
        var packet='';
        if(
                !params.type ||
                !params.key ||
                !params.value
        ){
            this.emit(
                'error',
                'missing one or more required params when attepting to set. required object keysets : type, key, value'
            )
            return;
        }

        switch(params.type){
            case 'board' :
                packet = 'set /PCK/'+
                    this.params.type+
                    '/'+
                    this.data.serial+
                    '/'+
                    params.key+
                    '="'+
                    params.value+
                    '"\r\n';
                break;
            default :
                packet = 'set /PCK/'+
                    this.params.type+
                    '/'+
                    this.data.serial+
                    '/'+
                    params.type+
                    '/'+
                    params.key+
                    '="'+
                    params.value+
                    '"\r\n';
                break;
        }

        if(this.params.rawLog)
            this.emit(
                'log',
                packet
            );

        if(this.data[params.type]){
            this.data[params.type][params.key]=params.value;
            this.client.write(packet);
            return;
        }

        this.emit(
            'error',
            {
                message : 'phidget.data.'+params.type+' not available.',
                type    : params.type
            }
        );

        this.data[params.type][params.key]=params.value;
        this.client.write(packet);
    };

    function setRate(rate){
        rate=Math.round(rate); //ints only.
        if(rate>8){
            rate=Math.round(rate/8)*8; //sampling over 8ms is in 8ms blocks.
        }

        //specific rates below 8ms blocks
        if(rate<8 && rate>4){
            rate=4;
        }
        if(rate<4 && rate<2){
            rate=2;
        }
        if(rate<2){
            rate=1;
        }

        this.params.rate=rate||this.params.rate;
        this.client.write(
            'report '+
            this.params.rate+
            ' report\r\n'
        );
    }


    function getRate(){
        return phidget.params.rate;
    }

    function quit(){
        this.ready = false;
        this.client.write('quit\r\n');
        this.emit('disconnected');
    };

    function disconnected(){
        this.ready=false;
        try{
            this.emit(
                'disconnected'
            );
        }catch(e){
            if(this.params.rawLog)
                this.emit(
                    'log',
                    e
                );
        }
        delete this.client;
        this.client={};
    };

    function connected(){
        this.setEncoding('utf8');
        //phidget.client.setKeepAlive('enable', 10000);

        this.on(
            'data',
            update.bind(phidget)
        );

        this.on(
            'end',
            phidget.disconnected
        );

        this.on(
            'close',
            phidget.disconnected
        );

        this.write(
            '995 authenticate, version='+
            phidget.params.version+
            '\r\n'
        );

        phidget.rate=phidget.params.rate || 8;

        var randInt = parseInt(Math.random() * 99999, 10),
            openStr = 'set /PCK/Client/0.0.0.0/' + randInt + '/' + phidget.params.type,
            listenStr = 'listen /PSK/' + phidget.params.type;

        if (phidget.params.label && !phidget.params.serial) {
            listenStr+='/'+phidget.params.label;
        }
        if (phidget.params.serial) {
            openStr += '/' + phidget.params.serial;
            listenStr+='/'+
                (
                    (phidget.params.label)?phidget.params.label:'[a-zA-Z_0-9/.\\\\-]*'
                )
                +'/'+phidget.params.serial;
        }

        openStr+='="Open" for session\r\n';
        listenStr+=' lid0\r\n';

        phidget.client.write(openStr);

        if(phidget.params.type=='PhidgetManager'){
            phidget.client.write(
                'listen /PSK/List/ lid0\r\n'
            );

            return;
        }
        phidget.client.write(listenStr);

    }

    return phidget;
}

exports.Phidget = Phidget;
