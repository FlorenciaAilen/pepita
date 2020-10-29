let canvas3 = document.getElementById("canvatres")
let ctx3 = canvas3.getContext("2d")
canvas3.height = 500;
canvas3.width = 900;
canvas3.style.backgroundImage = 'url("img/backCanvasTres.jpg")'
canvas3.style.backgroundSize = 'cover'

function resizeCanvas(){
    // redimensionar el canvas para que mantenga la proporcion con respecto a la ventana
    canvas3.height = 500;
    canvas3.width = 900;
}

window.addEventListener("resize", resizeCanvas);

// mapa del juego
let map = [ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
            [1,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,2],
            [1,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,1],
            [1,0,0,0,0,1,1,0,1,0,0,0,1,0,1,1,0,1],
            [1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,0,0,1],
            [1,0,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,1],
            [1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

// guardando la ubicacion de todo            
let collBox = [];

function drawMap(e){
    for(let i = 0; i<e.length;i++){
        collBox.push([])
        for(let j = 0; j < e[i].length ; j++){
            if(e[i][j] === 1){
                ctx3.beginPath();
                ctx3.fillStyle = "#000000"
                ctx3.fillRect(j*50,i*50,50,50);
            } else if(e[i][j] ===2){
                ctx3.beginPath();
                ctx3.fillStyle = "#356657"
                ctx3.fillRect(j*50,i*50,50,50);
            }else if(e[i][j] === 3){
                ctx3.beginPath();
                ctx3.fillStyle = "white"
                ctx3.fillRect(j*50,i*50,50,50);
            }
            collBox[i].push({x:j*50,y:i*50,status: e[i][j] === 1 ? 1 : (e[i][j] === 2 ? 2 : 0)});
        }

    }
}

// PEPITA
// const playerSprite = new Image()
// playerSprite.src = "../img/character2.png"
const playerSprite = new Image()
playerSprite.src = "img/character2.png"

function drawPlayer(x,y){
    ctx3.drawImage(playerSprite,player.width * player.frameX,player.height * player.frameY,player.width,player.height,player.x,player.y,player.width2,player.height2)         
}

function move(x,y){
    drawPlayer(x,y)
    drawMap(map)
    

    player.x = player.newX
    player.y = player.newY
}

let player = {
    x:50,
    y:450,
    newX:0,
    newY:0,
    width:88.375,
    height:101.5,
    width2:50,
    height2:50,
    frameX:0,
    frameY: 0,
    moving: false
} 

// chequeando con quien choca pepita
function checkColl(){
    for(let i = 0; i < 10 ; i++){
        for(let j = 0; j < 18 ; j++){
            let b = collBox[i][j]

            if(player.newX === b.x && player.newY === b.y){
                if (b.status === 1){
                    console.log('wall')
                } else if (b.status === 2){

                    if(coinsCollect.length == 34){
                        console.log('win')
                        move(player.newX,player.newY)
                        document.getElementById('btn').classList.remove('hidden')
                        document.getElementById('box-a').classList.add('bg-danger')
                        $('#gameWin').modal('show')
                    }else{
                       
                        move(player.newX,player.newY)
                       // alert(`Te faltan juntar ${35 - coinsCollect.length} para ganar`)
                        $('#gameOver').modal('show')
                    }
                
                   
                }else if (b.status === 3){
                    console.log('win')
                    move(player.newX,player.newY)
                }else{
                    move(player.newX,player.newY)
                }
                
            } else if(player.newX < 0 || player.newX > 900 && player.y < 0 || player.y >500 ){
                console.log('wall')
            }
        }
    }
}

// escuchador de las flechitas del teclado

//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    
    switch (e.key) {
    // Arriba
    case "ArrowUp":
    case "w":
    case "W":
        player.newX = player.x; 
        player.newY = player.y - 50;
        player.moving = true
        player.frameY = 3
    break;
    // Abajo
    case "ArrowDown":
    case "s":
    case "S":
        player.newX = player.x; 
        player.newY = player.y + 50;
        player.moving = true
        player.frameY = 0
    break;
    // Izquierda
    case "ArrowLeft":
    case "a":
    case "A":
        player.newX = player.x - 50; 
        player.newY = player.y;
        player.moving = true
        player.frameY = 2
    break;
    
    // Derecha
    case "ArrowRight":
    case "d":
    case "D":
        player.newX = player.x + 50; 
        player.newY = player.y;
        player.moving = true
        player.frameY = 1
    break;
    
    default:
        break;
    }
    checkColl()
    handlePlayerFrame()
    })


function handlePlayerFrame(){
    if(player.frameX < 7 && player.moving){
        player.frameX++
    } 
    else{ 
        player.frameX = 0
    }   
}

// ENEMIGOS

//colisiones con enemigos

function collision(enemy){
    if(player != enemy){
        const myLeft = enemy.x ;
        const myRight = enemy.x + enemy.width ;
        const myTop = enemy.y ;
        const myBottom = enemy.y + enemy.height ;
    
        const otherLeft = player.x ;
        const otherRight = player.x + player.width2 ;
        const otherTop = player.y ;
        const otherBottom = player.y + player.height2 ;
        let colide = true;
        if(
            myLeft >= otherRight ||
            myRight <= otherLeft ||
            myTop >= otherBottom ||
            myBottom <= otherTop
            ){
            colide = false;
        }
                  
        if(colide){
            player.x = 50
            player.y = 450
            console.log('choco')
            for(let i = 0 ; i < coinsCollect.length ; i++){
                coins.push(coinsCollect[i])
            }
            coinsCollect = []
        };
    };
}

const enemyOne = new Image()
enemyOne.src = "img/enemy1.png"

const enemyTwo = new Image()
enemyTwo.src = "img/enemy2.png"

const enemyThree = new Image()
enemyThree.src = "img/enemy3.png"

const enemyFour = new Image()
enemyFour.src = "img/enemy4.png"

const enemyFive = new Image()
enemyFive.src = "img/enemy5.png"

const enemigoA = {
    id: enemyOne,
    sheetWidth: 256,
    sheetHeight:256,
    cols:4,
    rows:4,
    widthImg: 64,
    heightImg: 64,
    frameX:0,
    frameY: 0,
    cantFrames:4,
    frameUp:3,
    frameDown:1,
    frameLeft:1,
    frameRight:2,
    vigilando: ["right","right","right","right","left","left","left","left","down","down","right","right","right","right","left","left","left","left","up","up"],
    x:450,
    y:50,
    width:50,
    height:50
  }

  const enemigoB = {
    id: enemyTwo,
    sheetWidth: 320,
    sheetHeight:640,
    cols:2,
    rows:4,
    widthImg: 160,
    heightImg: 160,
    frameX:0,
    frameY: 0,
    frameUp:1,
    frameDown:0,
    frameLeft:2,
    frameRight:3,
    cantFrames:2,
    vigilando:["down","down","down","right","right","right","right","right", "up","up","up","left","left","left","left","left"] ,
    x:50,
    y:50,
    width:50,
    height:50

  }

  const enemigoC = {
    id: enemyThree,
    sheetWidth: 480,
    sheetHeight:960,
    cols:2,
    rows:4,
    widthImg: 240,
    heightImg: 240,
    frameX:0,
    frameY: 0,
    frameUp:1,
    frameDown:0,
    frameLeft:2,
    frameRight:3,
    cantFrames:2,
    vigilando:["up","up","up","up","up","left","down","down","down","right","down","down"] ,
    x:800,
    y:300,
    width:50,
    height:50

  }

  const enemigoD = {
    id: enemyFour,
    sheetWidth: 640,
    sheetHeight:1280,
    cols:2,
    rows:4,
    widthImg: 320,
    heightImg: 320,
    frameX:0,
    frameY: 0,
    frameUp:1,
    frameDown:0,
    frameLeft:2,
    frameRight:3,
    cantFrames:2,
    vigilando:["up","up","up","up","up","left","left","down","down","left","left","right","right","down","down","down","left","left","right","right","up","up","up","up","up","right","right","down","down","down","down","down"] ,
    x:650,
    y:400,
    width:50,
    height:50

  }

  const enemigoE = {
    id: enemyFive,
    sheetWidth: 320,
    sheetHeight:640,
    cols:2,
    rows:4,
    widthImg: 160,
    heightImg: 160,
    frameX:0,
    frameY: 0,
    frameUp:1,
    frameDown:0,
    frameLeft:2,
    frameRight:3,
    cantFrames:2,
    vigilando:["left","left","left","down","down","down","down","down","up","up","up","up","up","right","right","right","down","right","down","down","up","up","left","up"] ,
    x:300,
    y:150,
    width:50,
    height:50

  }
  let enemies = [enemigoA,enemigoB,enemigoC,enemigoD,enemigoE]

  function drawEnemies(enemy){
    //   ctx3.fillStyle = "red"
    //   ctx3.fillRect(enemy.x,enemy.y,enemy.width,enemy.height)
      ctx3.drawImage(enemy.id,enemy.widthImg * enemy.frameX,enemy.heightImg * enemy.frameY,enemy.widthImg,enemy.heightImg,enemy.x,enemy.y,enemy.width,enemy.height)         
  }

  
  function moveEnemy(component, direction, pace) {
    if (direction === "up") {
       component.y -= pace
       component.frameY = component.frameUp 
       //handleEnemyFrame(component,component.cantFrames)
  
    }
    if (direction === "down") {
      component.y += pace
      component.frameY = component.frameDown
      //handleEnemyFrame(component,component.cantFrames)

    }
    if (direction === "left") {
      component.x -= pace
      component.frameY = component.frameLeft
      //handleEnemyFrame(component,component.cantFrames)
  
    }
    if (direction === "right") {
       component.x += pace
       component.frameY = component.frameRight
       //handleEnemyFrame(component,component.cantFrames)
   
    }
  }


let currentFrame3 = 0;


// calcular en qué frame estoy. En base a ese frame es el movimiento que debe hacer el personaje
function movimiento(enemigo){
  return (currentFrame3 / frameRate * 2) % (enemigo.vigilando.length);
}

// poniendo en funcionamiento todo el juego
const frameRate = 60

function updateFrame() {
  ctx3.clearRect(0,0,900,500)
  drawMap(map);
  coins.forEach(c => {
      c.draw()
      c.coll()
    })
  drawPlayer(player.x,player.y);
  enemies.forEach(enemy => {
    moveEnemy(enemy, enemy.vigilando[movimiento(enemy)], 50)
      drawEnemies(enemy)
      collision(enemy)
    })
    

  currentFrame3++
}


setInterval(updateFrame, 1000 / frameRate);



// COINS
class Coin {
    constructor(x, y) {
      // Propiedades
      this.x = x;
      this.y = y;
      this.width = 20;
      this.height = 20;

      // methods
      this.coll = function(){
        if(player != this){
            const myLeft = this.x ;
            const myRight = this.x + this.width ;
            const myTop = this.y ;
            const myBottom = this.y + this.height ;
        
            const otherLeft = player.x ;
            const otherRight = player.x + player.width2 ;
            const otherTop = player.y ;
            const otherBottom = player.y + player.height2 ;
            let colide = true;
            if(
                myLeft >= otherRight ||
                myRight <= otherLeft ||
                myTop >= otherBottom ||
                myBottom <= otherTop
                ){
                colide = false;
            }
                      
            if(colide){
                coins.splice(coins.indexOf(this), 1);
                coinsCollect.push(this)
            };
        };
      }
      this.draw = function () {
        const coinImg = new Image();
        coinImg.src = 'img/coin1.png'
        ctx3.drawImage(coinImg,this.x,this.y,this.width,this.height)
        }   
    }
}

let coinsCollect = []
let coins = []
coins.push(new Coin(65,125))
coins.push(new Coin(65,65))
coins.push(new Coin(365,65))
coins.push(new Coin(365,125))
coins.push(new Coin(315,65))
coins.push(new Coin(315,325))
coins.push(new Coin(315,375))
coins.push(new Coin(315,425))
coins.push(new Coin(515,425))
coins.push(new Coin(565,425))
coins.push(new Coin(565,375))
coins.push(new Coin(565,325))
coins.push(new Coin(465,325))
coins.push(new Coin(465,275))
coins.push(new Coin(465,125))
coins.push(new Coin(465,65))
coins.push(new Coin(515,65))
coins.push(new Coin(565,65))
coins.push(new Coin(615,65))
coins.push(new Coin(665,65))
coins.push(new Coin(765,65))
coins.push(new Coin(765,115))
coins.push(new Coin(765,175))
coins.push(new Coin(765,225))
coins.push(new Coin(665,425))
coins.push(new Coin(715,425))
coins.push(new Coin(765,425))
coins.push(new Coin(665,375))
coins.push(new Coin(165,375))
coins.push(new Coin(165,425))
coins.push(new Coin(215,375))
coins.push(new Coin(165,325))
coins.push(new Coin(165,165))
coins.push(new Coin(225,165))
