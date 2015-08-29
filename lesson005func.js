window.addEventListener(
    'DOMContentLoaded',
    init
)

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelector('#controls').addEventListener(
        'click',
        function(e){
            var demo=document.getElementById('video');

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
                    break;
            }
        }
    );
}
