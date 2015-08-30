window.addEventListener(
    'DOMContentLoaded',
    init
);

function init(){
    bindEvents();
}

function bindEvents(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    var dropArea = document.querySelector('#dropArea');

    progBar.value = 0; //initialize video to start and aviod cyborg eye

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

function showProgress(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    progBar.value=(video.currentTime/video.duration);
}

function togglePlay(){
    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
}

function playing(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.add('hide');
    document.querySelector('#pause').classList.remove('hide');
    player.classList.remove('paused');

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
        case 'volU' :
            if (video.volume <1){
                video.volume+=0.1;
            };
            break;
        case 'volD' :
            if (video.volume >0){
                video.volume-=0.1;
            };
            break;
        case 'change' :
            video.classList.toggle('poop');
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

