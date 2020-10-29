// const playerSprite = new Image()
// playerSprite.src = "../img/character2.png"
playerSprite = new Image()
// playerSprite.src = "img/character2.png"


function cambiarOutfit(url){

    playerSprite.src = url 
    localStorage.setItem("url", url)
}


