window.addEventListener(
    'DOMContentLoaded',
    init
)

function init(){
    bindEvents();
}

function bindEvents(){
    var video = document.getElementsByClassName('video')[0];
    var progBar = document.getElementsByClassName('scrubber')[0];
    var scrub = document.getElementsByClassName('progress')[0];

    scrub.addEventListener(
        'click',
        console.log(':)')
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



