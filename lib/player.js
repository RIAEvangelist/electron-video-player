window.addEventListener(
    'DOMContentLoaded',
    init
);

function init(){
    bindEvents();
}

function bindEvents(){
    var video = document.querySelector('video');
    var progBar = document.querySelector('progress');
    var body = document.querySelector('body');

    progBar.value = 0; //initialize video to start and aviod cyborg eye

    video.addEventListener(
        'timeupdate',
        function(){
            progBar.value=(video.currentTime/video.duration);
        }
    );

    body.addEventListener(
        'dragenter',
        ignore
    );

    body.addEventListener(
        'dragover',
        ignore
    );

    body.addEventListener(
        'drop',
        loadVideo
    );

    document.querySelector('#player').addEventListener(
        'click',
        playerClicked
    );
}

function ignore(e) {
    e.preventDefault();
};

function loadVideo(e) {
    e.preventDefault();
    var files = e.dataTransfer.files;
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
    if(!e.target.id || e.target.id=='controls'){
        return;
    }
    switch(e.target.id){
        case 'video' :
            document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
            break;
        case 'play' :
            video.play();
            e.target.classList.add('hide');
            document.querySelector('.pause').classList.remove('hide');
            break;
        case 'pause' :
            video.pause();
            e.target.classList.add('hide');
            document.querySelector('.play').classList.remove('hide');
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
        default :
            console.log('stop half assing shit.');
    }
}

