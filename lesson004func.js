
window.addEventListener(
    'DOMContentLoaded',
    init
)

function init(){
    bindEvents();
}

function moveit(e){
    setTimeout(
        bounce,
        600
        );
    bounce();
}

function bounce(){
    console.log('intervalling..');
    var movingDiv=document.getElementsByClassName('movingDiv')[0];
    movingDiv.classList.toggle('poop');

    return true;
}

function bindEvents(){
    var movingDiv=document.getElementsByClassName('movingDiv')[0];

    movingDiv.addEventListener(
        'mouseover',
        moveit
    );


}
