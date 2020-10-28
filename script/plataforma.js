
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

