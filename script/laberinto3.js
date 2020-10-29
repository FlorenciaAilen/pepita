//MEDIDAS DEL CANVAS
//CAMBIA AL TAMAÑO DEL CANVAS CADA VEZ QUE CAMBIA DE TAMAÑO LA PANTALLA

function resizeCanvas() {
    canvas.width =  window.innerWidth * 0.7;;
    canvas.height= window.innerHeight * 0.8;
}
window.addEventListener("resize", resizeCanvas)


//ASIGNO VALORES AL CANVAS
let canvas = document.getElementById("canvascinco");

canvas.width =  window.innerWidth * 0.7;
canvas.height= window.innerHeight * 0.8;

canvas.style.background = "blue"
canvas.style.backgroundImage = 'url("img/fondo.jpg")';
canvas.style.backgroundSize = 'cover';
let ctx= canvas.getContext("2d")

//CREO A PEPITA
var characterSprite = new Image()
characterSprite.src = "img/pepitaOrigin.png";

let character = {
    x:0,
    y:450,
    width:709/8,
    height:508/5,
    width2:89,
    height2:101,
    frameX:0,
    frameY:0,
    colisionCriatura: false,
    criaturaDead: null
}
function drawPlayer(x,y){
    ctx.drawImage(characterSprite,character.width * character.frameX,character.height *character.frameY,character.width,character.height,character.x,character.y,character.width2,character.height2)
}
//ENEMIGOS

class Enemigo{
        constructor(x,y){
            this.x = x;
            this.y = y
            this.width = canvas.width/25;
            this.height = canvas.height/10;

            this.coll = function(){
                const myLeft = this.x;
                const myRight = this.x + this.width;
                const myTop = this.y;
                const myBottom = this.y + this.height;

                const otherLeft = character.x;
                const otherRight = character.x + character.width2;
                const otherTop = character.y;
                const otherBottom = character.y + character.height2;
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
                    character.colisionCriatura = true
                    character.criaturaDead = this
                    //enemigosArray.splice(enemigosArray.indexOf(this),1);
                }

            }
            this.draw = function (){
                let criatura= new Image()
                criatura.src = 'img/criatura.png';
                ctx.drawImage(criatura, this.x, this.y, this.width, this.height)
            }
                
        }
    
}

let enemigosArray =[];
enemigosArray.push (new Enemigo(canvas.height/3,canvas.width/2.8));
enemigosArray.push (new Enemigo(canvas.height/2.5,canvas.width/2.3));
enemigosArray.push (new Enemigo(canvas.height/1.7,canvas.width/2.6));
enemigosArray.push (new Enemigo(canvas.height/1.5,canvas.width/2.15));
enemigosArray.push (new Enemigo(canvas.height/1.2,canvas.width/2.3));
enemigosArray.push (new Enemigo(canvas.height/1.1,canvas.width/3));
enemigosArray.push (new Enemigo(canvas.height/1,canvas.width/2.6));
enemigosArray.push (new Enemigo(canvas.height/0.9,canvas.width/2.15));
enemigosArray.push (new Enemigo(canvas.height/0.8,canvas.width/2.3));
enemigosArray.push (new Enemigo(canvas.height/0.7,canvas.width/2.6));
enemigosArray.push (new Enemigo(canvas.height/0.6,canvas.width/2.15));

//Colision con Paredes

let colisionaRight = false;
let colisionaLeft = false;
let colisionaUp = false;
let colisionaDown = false;
let velocidad = 20

function colisiona() {
    if (character.x <= 0) {
        colisionaLeft = true;
    }
    if (character.x + character.width>= canvas.width) {
        colisionaRight = true;
    } 
    if (character.y <= 350) {
        colisionaUp = true;
    } 
    if (character.y + character.height >= canvas.height) {
        colisionaDown = true;
    }
}
let arriba = document.querySelector("#arriba i")
let abajo =document.querySelector("#abajo i")
let derecha =document.querySelector("#derecha i")
let izquierda =document.querySelector("#izquierda i")

document.addEventListener("keyup",(e)=>{

    arriba.style.color= "rgb(74, 255, 246)";
    arriba.style.borderColor= "black";
    
    abajo.style.color= "rgb(74, 255, 246)";
    abajo.style.borderColor= "black";
    
    izquierda.style.color= "rgb(74, 255, 246)";
    izquierda.style.borderColor= "black";
    
    derecha.style.color= "rgb(74, 255, 246)";
    derecha.style.borderColor= "black";
    
    })
//Teclado

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    
    switch (e.key) {
    
    case "r":
        if(character.colisionCriatura){
            enemigosArray.splice(enemigosArray.indexOf(character.criaturaDead),1);
            character.colisionCriatura = false;
            character.frameY = 4;
        }
        
break;
        // Arriba
    case "ArrowUp":
    case "w":
    case "W":     
            colisiona()
            if (!colisionaUp) {
                character.frameY = 3;
                character.y-=velocidad;
                colisionaRight = false;
                colisionaDown = false;
                colisionaLeft = false;
            }
            arriba.style.color="white";
            arriba.style.borderColor= "rgba(47, 121, 63, 0.548)";       
    break;
    // Abajo
    case "ArrowDown":
    case "s":
    case "S":
    
        colisiona()
        if (!colisionaDown) {
            character.frameY = 0;
            character.y+=velocidad;
            colisionaRight = false;
            colisionaUp = false;
            colisionaLeft = false;}
            abajo.style.color="white";
            abajo.style.borderColor= "rgba(47, 121, 63, 0.548)";
        
    break;
    // Izquierda
    case "ArrowLeft":
    case "a":
    case "A":
    
            colisiona()
            if (!colisionaLeft) {
                character.frameY = 2;
                character.x-=velocidad;
                colisionaRight = false;
                colisionaUp = false;
                colisionaDown = false;
        }
        izquierda.style.color="white";
        izquierda.style.borderColor= "rgba(47, 121, 63, 0.548)";      
    break;
    
    // Derecha
    case "ArrowRight":
    case "d":
    case "D":
        
        colisiona()
        if (!colisionaRight) {
            character.frameY = 1;
            character.x+=velocidad;
            colisionaDown = false;
            colisionaUp = false;
            colisionaLeft = false; }
            derecha.style.color="white";
            derecha.style.borderColor= "rgba(47, 121, 63, 0.548)";        
    break;
    
    default:
        break;
    }})





//FUNCIONES PRINCIPALES
function funcionPrincipal(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    finalNivel()
    drawPlayer()
    enemigosArray.forEach(enemigos => {
        enemigos.draw()
        enemigos.coll()
        })
        
}
function intervalo() {
    nIntervId = setInterval(funcionPrincipal, 1000/60);
 }
 function finalNivel() {   
    if(Object.entries(enemigosArray).length==0){
        console.log("final")
        let button = document.getElementById('siguiente')
        button.classList.remove('hidden')
    }
 }
intervalo()
funcionPrincipal()


//CONTADOR DE TIEMPO

window.onload = updateClock;
var totalTime = 25;
function updateClock() {
document.getElementById('countdown').innerHTML = totalTime;
if(totalTime==0){
    let button = document.getElementById('tryAgain')
    button.classList.remove('hidden')
clearInterval(nIntervId);
}else{
totalTime-=1;
setTimeout("updateClock()",1000);
}
}