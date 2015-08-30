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
        function(){
            progBar.value=(video.currentTime/video.duration);
        }
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

function togglePlay(){
    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
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
            e.target.classList.add('hide');
            document.querySelector('.pause').classList.remove('hide');
            player.classList.remove('paused');
            break;
        case 'pause' :
            video.pause();
            e.target.classList.add('hide');
            document.querySelector('.play').classList.remove('hide');
            player.classList.add('paused');
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

