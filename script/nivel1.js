
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
let sheetWidth = 709;
let sheetHeight= 407;

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

let chocanPalancaRight = false;
let chocanPalancaLeft = false;
let chocanPalancaUp = false;
let chocanPalancaDown = false;

let colisionaRight = false;
let colisionaLeft = false;
let colisionaUp = false;
let colisionaDown = false;

// --------------------------ASTEROIDES----------------------------------------------

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
asteroideArray.push( new Asteroide ('img/lab1/base.svg', canvas.width/1.7, canvas.height/ 2.1, canvas.width /23, canvas.height /20))
asteroideArray.push( new Asteroide ('img/lab1/nave.png', canvas.width/2.3, canvas.height- canvas.height/2.3, canvas.width /5, canvas.height /2.5))

    

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

        if(  pepiTop <= astBottom && 
            astRight + width / 1.4  > pepiRight && 
            astLeft - width / 1.4 < pepiLeft && 
            astTop <= pepiTop )
            {
            chocanUp = true;
        }
        if(  pepiBottom >= astTop && 
            astRight + width / 1.4  > pepiRight && 
            astLeft - width / 1.4 < pepiLeft && 
            astBottom >= pepiBottom)
            {
            chocanDown = true;
        }
        if(pepiRight >= astLeft && 
            astBottom + height / 1.4 > pepiBottom && 
            astTop - height / 1.4 < pepiTop &&
            astRight >= pepiRight)
            {
            chocanRight = true;
        }
        if(pepiLeft <= astRight && 
            astBottom + height / 1.4 > pepiBottom && 
            astTop - height / 1.4 < pepiTop &&
            astLeft <= pepiLeft)
            {
           chocanLeft = true;
        }
      })
}

// --------------------------PALANCAS----------------------------------------------
class Palanca {
    constructor(src, x, y, width,height) {
      // Propiedades
     let  palanca = new Image()
      palanca.src = src;
      this.src = palanca
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

    this.draw = function () {
         ctx.drawImage(palanca, this.x, this.y, this.width, this.height);

    }
}
}

let palancaDerecha = new Palanca ('img/lab1/palanca1.svg', canvas.width/1.7, canvas.height/ 2.35, canvas.width /23, canvas.height /15);
let palancaIzquierda =  new Palanca ('img/lab1/palanca2.svg', canvas.width/1.7, canvas.height/ 2.35, canvas.width /23, canvas.height /15);
let nave = new Asteroide ('img/lab1/nave.png', canvas.width/2.3, canvas.height- canvas.height/2.3, canvas.width /5, canvas.height /2.5);
let botton =  new Palanca('img/lab1/botton.svg', canvas.width/1.2, canvas.height- canvas.height/12, canvas.width /6, canvas.height /10)

function colisionaPalanca(palanca) {
    const pepiLeft = x;
    const pepiRight = x + width;
    const pepiTop = y;
    const pepiBottom = y + height;
    
    const palancaLeft = palanca.x;
    const palancaRight = palanca.x + palanca.width;
    const palancaTop = palanca.y;
    const palancaBottom = palanca.y + palanca.height;
   
    if(  pepiTop <= palancaBottom && 
         palancaRight + width / 1.2  > pepiRight && 
         palancaLeft - width / 1.2 < pepiLeft && 
         palancaTop <= pepiTop ){
         chocanPalancaUp = true;
    }
    if(  pepiBottom >= palancaTop && 
         palancaRight + width / 1.2  > pepiRight && 
         palancaLeft - width / 1.2 < pepiLeft && 
         palancaBottom >= pepiBottom){
         chocanPalancaDown = true;
    }
    if(pepiRight >= palancaLeft && 
         palancaBottom + height / 1.2 > pepiBottom && 
         palancaTop - height / 1.2 < pepiTop &&
         palancaRight >= pepiRight){
         chocanPalancaRight = true;
    }
    if(pepiLeft <= palancaRight && 
         palancaBottom + height / 1.2 > pepiBottom && 
         palancaTop - height / 1.2 < pepiTop &&
         palancaLeft <= pepiLeft){
        chocanPalancaLeft = true;
    }
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

    colisionaPalanca(palancaDerecha) 
    if(!chocanPalancaRight)
    {
        console.log(chocanPalancaRight)
    }
   
   colisionaAsteroide(asteroideArray);
    if(!chocanRight){
     colisiona();
    
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
    chocanRight= false  
}

function moveLeft(){

    colisionaPalanca(palancaDerecha) 
    if(!chocanPalancaLeft)
    {
        console.log('toqué por derecha de palanca')
    }
   
   colisionaAsteroide(asteroideArray);
   if(!chocanLeft){
     colisiona();

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
    chocanLeft = false
}

function moveDown(){

    colisionaPalanca(palancaDerecha) 
    if(!chocanPalancaDown)
    {
        console.log(chocanPalancaDown)
    
    }
    
   colisionaAsteroide(asteroideArray);
    if(!chocanDown){
     colisiona();

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
    chocanDown=false;
}
function moveUp(){
   
    colisionaPalanca(palancaDerecha) 
    if(chocanPalancaUp)
    {
        console.log('toqué por debajo de palanca')
    }
   
    colisionaAsteroide(asteroideArray);
    if(!chocanUp){
     colisiona();
    
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
    chocanUp = false;

}
//LA FUNCION QUE ACTUALIZA CONSTANTEMENTE TODO, PRIMERO BORRA TODO EL CANVAS,
//DESPUES DIVIDE LOS FRAMES POR LA CANTIDAD DE MOVIMIENTOS EN X, INDICA EN QUE
//POSICION DE X ESTA LA IMG, Y DEPENDIENDO DE LOS VALORES DEL MOVIMIENTO INDICA T O F
function updateFrame(){

    ctx.clearRect(x, y, width, height);
    //borra el espacio de la palanca y nave
    ctx.clearRect(canvas.width/1.7, canvas.height/ 2.35, canvas.width /23, canvas.height /15)
    ctx.clearRect(canvas.width/2.3, canvas.height- canvas.height/2.3, canvas.width /5, canvas.height /2)
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
    botton.draw();
    //dibuja a los asteroides cada vez que se actualiza
    asteroideArray.forEach(ast => {
    ast.draw()}
    )
    //revisa si toqué la palanca para saber qué palanca dibujar y mover la nave
    if(!chocanPalancaDown){
    palancaDerecha.draw() 
    nave.draw()} 
    else{
    palancaIzquierda.draw()
    moverNave(5);
    }
    //al llegar al boton del final aparece el boton de siguiente nivel
    finalNivel();

}, 30);


function moverNave(num){
    asteroideArray[7].y += num; 
}

//llAMO A LOS BOTONES DE LAS FLECHAS
let arriba = document.querySelector("#arriba i")
let abajo =document.querySelector("#abajo i")
let derecha =document.querySelector("#derecha i")
let izquierda =document.querySelector("#izquierda i")

//CUANDO DEJO DE PRESIONAR LA TECLA LOS COLORES Y EL BORDE VUELVEN A SU ESTADO ORIGINAL 
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
//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
e.preventDefault();
switch (e.key) {
// Arriba
case "ArrowUp":
case "w":
case "W":
    moveUp()
    arriba.style.color="white";
    arriba.style.borderColor= "rgba(47, 121, 63, 0.548)";
break;
// Abajo
case "ArrowDown":
case "s":
case "S":
    moveDown();
    abajo.style.color="white";
    abajo.style.borderColor= "rgba(47, 121, 63, 0.548)";
break;
// Izquierda
case "ArrowLeft":
case "a":
case "A":
    moveLeft();
    izquierda.style.color="white";
    izquierda.style.borderColor= "rgba(47, 121, 63, 0.548)";
break;

// Derecha
case "ArrowRight":
case "d":
case "D":
    moveRight();
    derecha.style.color="white";
    derecha.style.borderColor= "rgba(47, 121, 63, 0.548)";
break;

default:
    break;
}
})


function finalNivel() {
    if(x + width >=  canvas.width/1.2 && y + height >= canvas.height- canvas.height/12) {
      
        console.log("final")
        let button = document.getElementById('siguiente')
        button.classList.remove('hidden')

    }
 }

