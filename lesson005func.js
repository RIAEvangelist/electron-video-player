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
        function()
                {progBar.value=(video.currentTime/video.duration);
                }
    );

    document.querySelector('#controls').addEventListener(
        'click',
        function(e){
            if(!e.target.id || e.target.id=='controls'){
                return;
            }
            switch(e.target.id){
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
    );

}



