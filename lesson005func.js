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
    progBar.value = 0; //initialize video to start and aviod cyborg eye

    video.addEventListener(
        'timeupdate',
        function(){progBar.value=(video.currentTime/video.duration);}
    );

    document.querySelector('#controls').addEventListener(
        'click',
        function(e){
            switch(e.target.id){
                case 'play' :
                    video.play();
                    break;
                case 'pause' :
                    video.pause();
                    break;
                case 'volU' :
                    video.volume+=0.1;
                    break;
                case 'volD' :
                    video.volume-=0.1;
                    break;
                case 'change' :
                    video.classList.toggle('poop');
                    break;
            }
        }
    );

}



