function Game(gameDiv){

    let frames = [];
    let framesNames = [];

    for (let i=0 ; i < gameDiv.childNodes.length; i++){

        let id = gameDiv.childNodes[i].id;

        if(id != undefined){

            let child = gameDiv.childNodes[i];

            if(child.classList.contains("frame")){

                frames[id] = child ;
                framesNames.push(id);
            }
        }
    }

    function setFrameVisible(name){
        frames[name].classList.remove("hidden")
        frames[name].classList.add("visible")
    }

    function setFrameHidden(name){
        frames[name].classList.remove("visible")
        frames[name].classList.add("hidden")
    }

    return{
        "setFrameVisible": setFrameVisible,
        "setFrameHidden" : setFrameHidden
    }
}


let game
window.addEventListener('load', function(){
    game = new Game(document.getElementById("game"));
})



