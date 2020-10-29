
//MEDIDAS DEL CANVAS
var canWidth =  window.innerWidth * 0.7;
var canHeight = window.innerHeight * 0.8;

//ARRANCA EN POSICION
var x= 0;
var y= 0;

//POR DEFECTO TODO EN FALSO
var left = false;
var up = false;
var down = false;

//LAS POSICIONES DE CADA MOVIMIENTO EN Y
var trackLeft = 2;
var trackRight = 1;
var trackUp = 0;
var trackDown = 3;

var srcX;
var srcY;

//TAMAÑO DEL TOTAL DEL LIENZO DE PEPITA
var sheetWidth = 938;
var sheetHeight= 680;

var cols = 8;
var rows = 4;

var width = sheetWidth / cols; 
var height = sheetHeight / rows; 

var currentFrame = 0;

//SE DIBUJA A PEPITA
var character = new Image()
character.src = "img/character.png";

//MEDIDAS DEL CANVAS
var canWidth =  window.innerWidth * 0.7;
var canHeight = window.innerHeight * 0.8;

var sheetWidth = 938;
var sheetHeight= 680;
// The attributes of the playerPlatform.
const monster = new Image();
monster.src = `img/monster.png`;
const background = new Image();
background.src = `img/background.platform.jpg`;

var defaultPlayerValues = {
    x: 25,
    y: 175,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 20,
    width: 20
    };

var playerPlatform = {...defaultPlayerValues};
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
    };
let enemiesPlatform = [{
    x:100,
    y:150,
    width:30,
    height:30
},
{
    x:400,
    y:150,
    width:30,
    height:30
},
{
    x:250,
    y:300,
    width:30,
    height:30
},
{
    x:225,
    y:200,
    width:30,
    height:30
},
{
    x:525,
    y:200,
    width:30,
    height:30
},
{
    x:620,
    y:250,
    width:30,
    height:30
},
{
    x:750,
    y:220,
    width:30,
    height:30
}];

let side = 'right'
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;
// The number of platforms
var num = 5;
// The platforms
var platforms = [];
// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.drawImage(background, 0, 0, sheetWidth, sheetHeight);
}
// Function to render the playerPlatform

function renderEnemies(){
    ctx.fillStyle = "#F08080";
    enemiesPlatform.forEach( enemy => {

        ctx.drawImage(monster, enemy.x -  enemy.width, enemy.y - enemy.height, enemy.width, enemy.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle="#FF0000";
        ctx.strokeRect(enemy.x -  enemy.width, enemy.y - enemy.height,  enemy.width, enemy.height);//for white background
    })
}

function restartPosition(){
    playerPlatform = {...defaultPlayerValues};
}

function renderplayer(movement){
    pepita = new Image();
    pepita.src = `img/pepita_${movement}.png`;
    ctx.drawImage(pepita, playerPlatform.x - playerPlatform.width, playerPlatform.y - playerPlatform.height, playerPlatform.width, playerPlatform.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle="#FF0000";
    ctx.strokeRect(playerPlatform.x - playerPlatform.width, playerPlatform.y - playerPlatform.height,  playerPlatform.width, playerPlatform.height);
}
// Function to create platforms
function createplat(){
    platforms.push(
        {
            x: 0,
            y: 200,
            width: 200,
            height: 15
        },
        {
            x: 100,
            y: 300,
            width: 200,
            height: 15
        },
        {
            x: 300,
            y: 200,
            width: 200,
            height: 15
        },
        {
            x: 550,
            y: 300,
            width: 200,
            height: 15
        },
        {
            x: 700,
            y: 250,
            width: 250,
            height: 15
        }
    );

    }
// Function to render platforms
function renderplat(){
    ctx.fillStyle = "#8C158E";
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    })
}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(playerPlatform.jump == false) {
            playerPlatform.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        

        if(playerPlatform.y_v < -2) {
        playerPlatform.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 
function loop() {
    // If the playerPlatform is not jumping apply the effect of frictiom
    if(playerPlatform.jump == false) {
        playerPlatform.x_v *= friction;
    } else {
        // If the playerPlatform is in the air then apply the effect of gravity
        playerPlatform.y_v += gravity;
    }
    playerPlatform.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        playerPlatform.x_v = -2.5;
    }
    if(keys.right) {
        playerPlatform.x_v = 2.5;
    }
    // Updating the y and x coordinates of the playerPlatform
    playerPlatform.y += playerPlatform.y_v;
    playerPlatform.x += playerPlatform.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    platforms.forEach((platform,index) => {

        if(platform.x < playerPlatform.x && playerPlatform.x - playerPlatform.width < platform.x + platform.width &&
            platform.y < playerPlatform.y && playerPlatform.y < platform.y + platform.height){
            i = index;
            if(playerPlatform.y_v > 14) playerPlatform.y_v = 0;
        }
    })

    enemiesPlatform.forEach(enemy => {
        if(playerPlatform.x + playerPlatform.width > enemy.x  && playerPlatform.x < enemy.x + enemy.width && 
            playerPlatform.y + playerPlatform.height > enemy.y && playerPlatform.y  < enemy.y + enemy.width){
            restartPosition();
        }
    });

    if(playerPlatform.x < 0 || playerPlatform.x + playerPlatform.width > 0 + canvas.width && 
        playerPlatform.y + height < 0 || playerPlatform.y > 0 + canvas.height){
        restartPosition();
    }

    if (i > -1){
        playerPlatform.jump = false;
        playerPlatform.y = platforms[i].y;    
    }
    // Rendering the canvas, the playerPlatform and the platforms
    if(keys.left || (keys.left && keys.up)) side = 'left'
    if(keys.right || (keys.right && keys.up)) side = 'right'

    rendercanvas();
    renderEnemies();
    renderplayer(side);
    renderplat();
}
canvas=document.getElementById("canvasTwo");
ctx=canvas.getContext("2d");
ctx.canvas.height = canHeight;
ctx.canvas.width = canWidth;
createplat();
// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);