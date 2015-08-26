var PHIDGET_SERVO_DEFAULT = 1;
var PHIDGET_SERVO_RAW_us_MODE = 2;
var PHIDGET_SERVO_HITEC_HS322HD = 3;
var PHIDGET_SERVO_HITEC_HS5245MG = 4;
var PHIDGET_SERVO_HITEC_805BB = 5;
var PHIDGET_SERVO_HITEC_HS422 = 6;
var PHIDGET_SERVO_TOWERPRO_MG90 = 7;
var PHIDGET_SERVO_HITEC_HSR1425CR = 8;
var PHIDGET_SERVO_HITEC_HS785HB = 9;
var PHIDGET_SERVO_HITEC_HS485HB = 10;
var PHIDGET_SERVO_HITEC_HS645MG = 11;
var PHIDGET_SERVO_HITEC_815BB = 12;
var PHIDGET_SERVO_FIRGELLI_L12_30_50_06_R = 13;
var PHIDGET_SERVO_FIRGELLI_L12_50_100_06_R = 14;
var PHIDGET_SERVO_FIRGELLI_L12_50_210_06_R = 15;
var PHIDGET_SERVO_FIRGELLI_L12_100_50_06_R = 16;
var PHIDGET_SERVO_FIRGELLI_L12_100_100_06_R = 17;
var PHIDGET_SERVO_SPRINGRC_SM_S2313M = 18;
var PHIDGET_SERVO_SPRINGRC_SM_S3317M = 19;
var PHIDGET_SERVO_SPRINGRC_SM_S3317SR = 20;
var PHIDGET_SERVO_SPRINGRC_SM_S4303R = 21;
var PHIDGET_SERVO_SPRINGRC_SM_S4315M = 22;
var PHIDGET_SERVO_SPRINGRC_SM_S4315R = 23;
var PHIDGET_SERVO_SPRINGRC_SM_S4505B = 24;
var PHIDGET_SERVO_USER_DEFINED = 25;

function ServoParams(servoType, minUs, maxUs, usPerDegree, maxUsPerS){
    Object.defineProperties(
        this,
        {
            usToDegrees:{
                enumerable:true,
                writeable:false,
                value:usToDegrees
            },
            degreesToUs:{
                enumerable:true,
                writeable:false,
                value:degreesToUs
            },
            usToDegreesVel:{
                enumerable:true,
                writeable:false,
                value:usToDegreesVel
            },
            degreesToUsVel:{
                enumerable:true,
                writeable:false,
                value:degreesToUsVel
            }
        }
    );

    function usToDegrees(us){
        return (us - minUs) / usPerDegree;
    }

    function degreesToUs(degrees){
        return (degrees + (minUs / usPerDegree)) * usPerDegree;
    }

    function usToDegreesVel(us){
        return us / usPerDegree;
    }

    function degreesToUsVel(degrees){
        return degrees * usPerDegree;
    }
}

function getServoParams(servoType){
    switch(servoType){
        case PHIDGET_SERVO_DEFAULT:
            return new ServoParams(PHIDGET_SERVO_DEFAULT,23 * 128/12.0,	243 * 128/12.0,    128/12.0,    50/12.0*16384);
        case PHIDGET_SERVO_RAW_us_MODE:
            return new ServoParams(PHIDGET_SERVO_RAW_us_MODE,    0,        10000,        1,        50/12.0*16384);
        case PHIDGET_SERVO_HITEC_HS322HD:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS322HD,	630,    	2310,        1680/180.0,    1680/180.0*316);
        case PHIDGET_SERVO_HITEC_HS5245MG:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS5245MG,	765,    	2185,        1420/145.0,    1420/145.0*400);
        case PHIDGET_SERVO_HITEC_805BB:
            return new ServoParams(PHIDGET_SERVO_HITEC_805BB,    650,    	2350,        1700/180.0,    1700/180.0*316);
        case PHIDGET_SERVO_HITEC_HS422:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS422,    650,    	2450,        1800/180.0,    1800/180.0*286);
        case PHIDGET_SERVO_TOWERPRO_MG90:
            return new ServoParams(PHIDGET_SERVO_TOWERPRO_MG90,	485,    	2335,        1850/175.0,    1850/175.0*545);
        case PHIDGET_SERVO_HITEC_HSR1425CR:
            return new ServoParams(PHIDGET_SERVO_HITEC_HSR1425CR,	1300,    	1740,        440/100.0,    440/100.0*500);
        case PHIDGET_SERVO_HITEC_HS785HB:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS785HB,	700,    	2550,        1850/2880.0,	1850/2880.0*225);
        case PHIDGET_SERVO_HITEC_HS485HB:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS485HB,	580,    	2400,        1820/180.0,    1820/180.0*272);
        case PHIDGET_SERVO_HITEC_HS645MG:
            return new ServoParams(PHIDGET_SERVO_HITEC_HS645MG,	580,    	2330,        1750/180.0,    1750/180.0*300);
        case PHIDGET_SERVO_HITEC_815BB:
            return new ServoParams(PHIDGET_SERVO_HITEC_815BB,    980,    	2050,        1070/180.0,    1070/180.0*250);
        case PHIDGET_SERVO_FIRGELLI_L12_30_50_06_R:
            return new ServoParams(PHIDGET_SERVO_FIRGELLI_L12_30_50_06_R,    1000,    	2000,        1000/30.0,    1000/30.0*23);
        case PHIDGET_SERVO_FIRGELLI_L12_50_100_06_R:
            return new ServoParams(PHIDGET_SERVO_FIRGELLI_L12_50_100_06_R,    1000,    	2000,        1000/50.0,    1000/50.0*12);
        case PHIDGET_SERVO_FIRGELLI_L12_50_210_06_R:
            return new ServoParams(PHIDGET_SERVO_FIRGELLI_L12_50_210_06_R,    1000,    	2000,        1000/50.0,    1000/50.0*5);
        case PHIDGET_SERVO_FIRGELLI_L12_100_50_06_R:
            return new ServoParams(PHIDGET_SERVO_FIRGELLI_L12_100_50_06_R,    1000,    	2000,        1000/100.0,    1000/100.0*23);
        case PHIDGET_SERVO_FIRGELLI_L12_100_100_06_R:
            return new ServoParams(PHIDGET_SERVO_FIRGELLI_L12_100_100_06_R,	1000,    	2000,        1000/100.0,    1000/100.0*12);
        case PHIDGET_SERVO_SPRINGRC_SM_S2313M:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S2313M,    535,    	2210,        1675/180.0,    1675/180.0*600);
        case PHIDGET_SERVO_SPRINGRC_SM_S3317M:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S3317M,    565,    	2365,        1800/180.0,    1800/180.0*375);
        case PHIDGET_SERVO_SPRINGRC_SM_S3317SR:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S3317SR,    1125,    	1745,        620/100.0,    50/12.0*16384);
        case PHIDGET_SERVO_SPRINGRC_SM_S4303R:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S4303R,    1050,    	1950,        910/100.0,    50/12.0*1638);
        case PHIDGET_SERVO_SPRINGRC_SM_S4315M:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S4315M,    630,    	2370,        1740/180.0,    1740/180.0*285);
        case PHIDGET_SERVO_SPRINGRC_SM_S4315R:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S4315R,    1150,    	1800,        650/100.0,    50/12.0*16384);
        case PHIDGET_SERVO_SPRINGRC_SM_S4505B:
            return new ServoParams(PHIDGET_SERVO_SPRINGRC_SM_S4505B,    665,    	2280,        1615/180.0,    1615/180.0*400);
        default:
            throw('unknown servo ',servoType);
    }
}


exports.ServoParams=ServoParams;
exports.getServoParams=getServoParams;
