window.addEventListener(
    'DOMContentLoaded',
    init
);

function init(){
    document.querySelector('#prog').value = 0;
    document.querySelector('#volRange').value=document.querySelector('#videoContainer').volume;
    bindEvents();
}

function bindEvents(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    var dropArea = document.querySelector('#dropArea');

    video.addEventListener(
        'timeupdate',
        showProgress
    );

    video.addEventListener(
        'play',
        playing
    );

    video.addEventListener(
        'ended',
        ended
    );

    video.addEventListener(
        'pause',
        paused
    );

    dropArea.addEventListener(
        'dragenter',
        makeDroppable
    );

    dropArea.addEventListener(
        'dragover',
        makeDroppable
    );

    dropArea.addEventListener(
        'drop',
        loadVideo
    );

    document.querySelector('#playerContainer').addEventListener(
        'click',
        playerClicked
    );

    document.querySelector('#chooseVideo').addEventListener(
        'change',
        loadVideo
    );

    document.querySelector('#volRange').addEventListener(
        'change',
        adjustVolume
    );

    document.querySelector('#enterLink').addEventListener(
        'change',
        loadVideo
    );

    window.addEventListener(
        'keyup',
        function(e){
            switch(e.keyCode){
                case 13 : //enter
                case 32 : //space
                    togglePlay();
                    break;
            }
        }
    );
}

function adjustVolume(e){
    var video = document.querySelector('#videoContainer');
    video.volume=e.target.value;
}

function showProgress(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    progBar.value=(video.currentTime/video.duration);
}

function togglePlay(){
    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
}

function toggleScreen(){
    document.querySelector('.fullscreen:not(.hide),.smallscreen:not(.hide)').click();
}

function playing(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.add('hide');
    document.querySelector('#pause').classList.remove('hide');
    player.classList.remove('paused');

    hideFileArea();
}

function maximized(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#fullscreen').classList.add('hide');
    document.querySelector('#smallscreen').classList.remove('hide');
    player.classList.remove('minimized');

    hideFileArea();
}

function hideFileArea(){
    var dropArea=document.querySelector('#dropArea');
    dropArea.classList.add('hidden');

    setTimeout(
        function(){
            var dropArea=document.querySelector('#dropArea');
            dropArea.classList.add('hide');
        },
        500
    );
}

function showFileArea(){
    var dropArea=document.querySelector('#dropArea');
    dropArea.classList.remove('hide');

    setTimeout(
        function(){
            var dropArea=document.querySelector('#dropArea');
            dropArea.classList.remove('hidden');
        },
        10
    );
}

function paused(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#pause').classList.add('hide');
    document.querySelector('#play').classList.remove('hide');
    player.classList.add('paused');

    showFileArea();
}

function minimized(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#smallscreen').classList.add('hide');
    document.querySelector('#fullscreen').classList.remove('hide');
    player.classList.add('minimized');

    showFileArea();
}

function ended(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.remove('hide');
    document.querySelector('#pause').classList.add('hide');
    player.classList.add('paused');

    showFileArea();
}

function makeDroppable(e) {
    e.preventDefault();
};

function loadVideo(e) {
    e.preventDefault();
    var files = [];
    if(e.dataTransfer){
        files=e.dataTransfer.files;
    }else if(e.target.files){
        files=e.target.files;
    }else{
        files=[
            {
                type:'video',
                path:e.target.value
            }
        ];
    }
    //handle playlist
    for (var i=0; i<files.length; i++) {
        console.log(files[i]);
        if(files[i].type.indexOf('video')>-1){
            var video = document.querySelector('video');
            video.src=files[i].path;
            video.play();
        }
    };
};

function playerClicked(e){
    if(!e.target.id || e.target.id=='controlContainer' || e.target.id=='dropArea'){
        return;
    }

    //ipc

    var ipc = require('ipc');
    ipc.Sync(BrowserWindow);

    //ipc
    var video = document.querySelector('#videoContainer');
    var player = document.querySelector('#playerContainer');

    switch(e.target.id){
        case 'video' :
            togglePlay();
            break;
        case 'play' :
            video.play();
            break;
        case 'pause' :
            video.pause();
            break;
        case 'volume' :
            document.querySelector('#volRange').classList.toggle('hidden');
            break;
        case 'mute' :
            video.muted=(video.muted)? false:true;
            player.classList.toggle('muted');
            break;
        case 'volRange' :
            //do nothing for now
            break;
        case 'fullscreen' :
            toggleScreen();
            break;
        case 'prog' :
            video.currentTime = ((e.offsetX)/e.target.offsetWidth)*video.duration;
            break;
        case 'close' :
            window.close();
            break;
        case 'fileChooser' :
            document.querySelector('#chooseVideo').click();
            break;
        case 'enterLink' :
            //do nothing for now
            break;
        default :
            console.log('stop half assing shit.');
    }
}

