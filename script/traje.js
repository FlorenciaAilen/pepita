
playerSprite = new Image()


function cambiarOutfit(url){

    playerSprite.src = url 
    localStorage.setItem("url", url)
}


