window.addEventListener(
    'DOMContentLoaded',
    init
)

function init(){
    bindEvents();
}

function bindEvents(){
    var video = document.getElementsByClassName('video')[0];
    document.querySelector('#controls').addEventListener(
        'click',
        function(e){
            var demo=document.getElementsByClassName('video')[0];

            switch(e.target.id){
                case 'play' :
                    demo.play();
                    break;
                case 'pause' :
                    demo.pause();
                    break;
                case 'volU' :
                    demo.volume+=0.1;
                    break;
                case 'volD' :
                    demo.volume-=0.1;
                    break;
                case 'change' :
                    video.classList.toggle('poop');
                    break;
            }
        }
    );
}

function progress(){

    var progBar = document.getElementsByClassName('scrubber')[0];
    var srub = document.getElementsByClassName('progress')[0];
    var v = document.getElementsByClassName('video')[0];

    progBar.addEventListener(
        'click',
        console.log('bar was clicked!')
        );

}

