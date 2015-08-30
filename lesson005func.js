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

    video.addEventListener(
        'timeupdate',
        function(){console.log('why');}
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



