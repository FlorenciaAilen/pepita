
//MEDIDAS DEL CANVAS
//CAMBIA AL TAMAÑO DEL CANVAS CADA VEZ QUE CAMBIA DE TAMAÑO LA PANTALLA

function resizeCanvas() {
    canvas.width =  window.innerWidth * 0.7;;
    canvas.height= window.innerHeight * 0.8;
}
window.addEventListener("resize", resizeCanvas)


//ASIGNO VALORES AL CANVAS
let canvas = document.getElementById("canvas");

canvas.width =  window.innerWidth * 0.7;
canvas.height= window.innerHeight * 0.8;

canvas.style.background = "blue"
canvas.style.backgroundImage = 'url("img/lab1/fondo.svg")';
canvas.style.backgroundSize = 'cover';
let ctx= canvas.getContext("2d")

//ARRANCA EN POSICION
let x= 0;
let y= 0;

//POR DEFECTO TODO EN FALSO
let left = false;
let up = false;
let down = false;

//LAS POSICIONES DE CADA MOVIMIENTO EN Y
let trackLeft = 2;
let trackRight = 1;
let trackUp = 0;
let trackDown = 3;

let srcX;
let srcY;

//TAMAÑO DEL TOTAL DEL LIENZO DE PEPITA
let sheetWidth = 908;
let sheetHeight= 521;

let cols = 8;
let rows = 4;

let width = sheetWidth / cols;
let height = sheetHeight / rows;

let currentFrame = 0;

//SE DIBUJA A PEPITA
let character = new Image()
character.src = "img/character.png";

let velocidad = 20;

// las colisiones siempre estan en falso

// let chocan = false;

let chocanRight = false;
let chocanLeft = false;
let chocanUp = false;
let chocanDown = false;

let colisionaRight = false;
let colisionaLeft = false;
let colisionaUp = false;
let colisionaDown = false;

// let obstaculos={
//     x: [/*1*/200, 200, 200, 200, 200, 200, 200, 200,   /*2*/  0,   0,  40, 40,

//       /*3*/ 370, 370, 370,   /*4*/  410, 450, 490, 530,

//       /*5*/  550, 550, 550, 550, 550, 550, 550,  /*6*/ 710, 710, 710, 710, 710, 710, 710,710,

//      ],

//       y: [/*1*/  0,  40,  80, 120, 160, 200, 240, 280, /*2*/  180, 220, 180, 220,

//       /*3*/  170, 210, 250,  /*4*/  280, 280, 280, 280,

//       /*5*/  0,  40,  80, 120, 160, 200, 240,   /*6*/ 170, 210, 250, 290, 330, 370, 410, 450,
//   ]
// };

class Asteroide {
    constructor(src, x, y, width,height) {
      // Propiedades
     let  asteroide = new Image()
      asteroide.src = src;
      this.src = asteroide
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

    this.draw = function () {
         ctx.drawImage(asteroide, this.x, this.y, this.width, this.height);

    }
}
}

let asteroideArray=[]
//                                           ctx.drawImage(asteroide, this.x, this.y, this.width, this.height);
asteroideArray.push( new Asteroide ('img/lab1/cubito.svg',0, canvas.height/3, canvas.width /10, canvas.height /10))
asteroideArray.push( new Asteroide ('img/lab1/fila.svg', canvas.width/4, 0, canvas.width /26, canvas.height /1.8))
asteroideArray.push( new Asteroide ('img/lab1/fila.svg', canvas.width/1.6, 0, canvas.width /26, canvas.height /1.8))
asteroideArray.push( new Asteroide ('img/lab1/filahoz.svg', canvas.width/2.25, canvas.height/2, canvas.width /5, canvas.height /18))
asteroideArray.push( new Asteroide ('img/lab1/filapequeña.svg', canvas.width/2.3, canvas.height/2.9, canvas.width /26, canvas.height /6))
asteroideArray.push( new Asteroide ('img/lab1/fila.svg', canvas.width/1.25, canvas.height- canvas.height/1.8, canvas.width /26, canvas.height /1.8))
asteroideArray.push( new Asteroide ('img/lab1/nave.png', canvas.width/2.3, canvas.height- canvas.height/2.3, canvas.width /5, canvas.height /2.5))
asteroideArray.push( new Asteroide ('img/lab1/base.svg', canvas.width/1.7, canvas.height/ 2.1, canvas.width /23, canvas.height /20))
asteroideArray.push( new Asteroide ('img/lab1/palanca1.svg', canvas.width/1.7, canvas.height/ 2.35, canvas.width /23, canvas.height /15))

    

console.log(asteroideArray)

function colisionaAsteroide(asteroideArray) {
    asteroideArray.forEach(asteroide => {
        const pepiLeft = x;
        const pepiRight = x + width;
        const pepiTop = y;
        const pepiBottom = y + height;

        const astLeft = asteroide.x;
        const astRight = asteroide.x + asteroide.width;
        const astTop = asteroide.y;
        const astBottom = asteroide.y + asteroide.height;

        if(  pepiTop <= astBottom){
            chocanUp = true;
            
            chocanDown = false;
            chocanRight = false;
            chocanLeft = false;

        }
        if(  pepiBottom >= astTop ){
            chocanDown = false;
            
            chocanUp = true;

            chocanRight = false;
            chocanLeft = false;
        }
        if(pepiRight >= astLeft){
            chocanRight = true;

            chocanLeft = false;
            chocanUp = false;
            chocanDown = false;
        }
        if(pepiLeft <= astRight){
           chocanLeft = true;

            chocanRight = false;
            chocanUp = false;
            chocanDown = false;
        }
      })
}



// y cuando estan en true es que no se pueden mover

function colisiona() {
    if (x <= 0) {
        colisionaLeft = true;
    }
    if (x + width >= canvas.width) {
        colisionaRight = true;
    }
    if (y <= 0) {
        colisionaUp = true;
    }
    if (y + height >= canvas.height) {
        colisionaDown = true;
    }
}

//LAS FUNCIONES DE MOVIMIENTO, PRIMERO ELIMINA TODO LO QUE ESTE EN EL CANVAS,
//LUEGO LE DA VALORES DEPENDIENDO PARA DONDE MOVER, DESPUES SE MUEVE TANTA CANTIDAD DE PIXELES
function moveRight(){
    ctx.clearRect(x, y, width, height);
    left = false;
    up = false;
    down = false;

    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaRight) {
        x+=velocidad;
        colisionaDown = false;
        colisionaUp = false;
        colisionaLeft = false;
    }
}

function moveLeft(){
    ctx.clearRect(x, y, width, height);
    left = true;
    up = false;
    down = false;

    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaLeft) {
        x-=velocidad;
        colisionaRight = false;
        colisionaUp = false;
        colisionaDown = false;
    }

}

function moveDown(){
    ctx.clearRect(x, y, width, height);
    up = false;
    left= false;
    down = true;

    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaDown) {
        y+=velocidad;
        colisionaRight = false;
        colisionaUp = false;
        colisionaLeft = false;
    }
}
function moveUp(){
    ctx.clearRect(x, y, width, height);
    up= true;
    left = false;
    down = false;

    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaUp) {
        y-=velocidad;
        colisionaRight = false;
        colisionaDown = false;
        colisionaLeft = false;
    }
}
//LA FUNCION QUE ACTUALIZA CONSTANTEMENTE TODO, PRIMERO BORRA TODO EL CANVAS,
//DESPUES DIVIDE LOS FRAMES POR LA CANTIDAD DE MOVIMIENTOS EN X, INDICA EN QUE
//POSICION DE X ESTA LA IMG, Y DEPENDIENDO DE LOS VALORES DEL MOVIMIENTO INDICA T O F
function updateFrame(){

    ctx.clearRect(x, y, width, height);
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;

    if(left == true & up == false & down == false){
    srcY = trackLeft * height;
        }
    if(up == true & left == false & down == false ){

    srcY = trackDown * height;
        }

    if(up == false & left == false & down == false){
    srcY = trackRight * height;
        }

    if(up == false & left == false & down == true){
    srcY = trackUp * height;
        }

}

//LA FUNCION QUE DIBUJA EL CANVAS
function drawImage(){
    updateFrame();
    ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height)
}

//DIBUJA EL CANVAS CADA TANTOS INTERVALOS
setInterval(function(){
    //dibuja a pepita cada vez que se actualiza
    drawImage();

 //dibuja a los asteroides cada vez que se actualiza
 asteroideArray.forEach(ast => {
    ast.draw()}
    )
   cambiaPalanca();

}, 100);

//
function cambiaPalanca(){
    if (   x    > canvas.height/2.35 + canvas.height /15 &&
          y    > canvas.height/2.35 + canvas.width /23 &&
    ( x + width  < canvas.width/1.7 &&
     y + height > canvas.height/2.35 )
     )
     {
      console.log("en posicion")
//       ctx.drawImage(this.x, this.y, this.width, this.height);

      ctx.clearRect (canvas.width/1.7, canvas.height/2.35,canvas.width /23, canvas.height /15)
     //else se dibuja la otra
     }else{
         asteroideArray.push( new Asteroide ('img/lab1/palanca2.svg', canvas.width/1.7, canvas.height/ 2.35, canvas.width /23, canvas.height /15))
    }
}

//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
e.preventDefault();
switch (e.key) {
// Arriba
case "ArrowUp":
case "w":
case "W":
   colisionaAsteroide(asteroideArray);
    if(!chocanUp){
     colisiona()
     moveUp()
        // console.log(chocan)
    } 
    chocanUp = false;
break;
// Abajo
case "ArrowDown":
case "s":
case "S":
   colisionaAsteroide(asteroideArray);
    if(!chocanDown){
     colisiona();
     moveDown();
    //  console.log(chocan);
    } 
    chocanDown=false;
break;
// Izquierda
case "ArrowLeft":
case "a":
case "A":
   colisionaAsteroide(asteroideArray);
   if(!chocanLeft){
     colisiona();
     moveLeft();
    //  console.log(chocan);
    } 
    chocanLeft = false
break;

// Derecha
case "ArrowRight":
case "d":
case "D":
   colisionaAsteroide(asteroideArray);

    if(!chocanRight){
     colisiona()
     moveRight()
    //  console.log(chocan)
    } 
    chocanRight= false
break;

default:
    break;
}
})


