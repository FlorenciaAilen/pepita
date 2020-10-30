
/**************   INICIO    ***************/
canvas = document.getElementById("canvaseis");
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.8;
canvas.style.background = "black";

function resizeCanvas() {
	canvas.width = window.innerWidth * 0.7;;
	canvas.height = window.innerHeight * 0.8;
}
window.addEventListener("resize", resizeCanvas)


function load() {
	if (canvas && canvas.getContext) {

		ctx = canvas.getContext("2d");
		principal()

		if (ctx) {
			x = canvas.width / 2;

			imgOvni = new Image();
			imgOvni.src = "img/ALIEN.png";

			obteneroutfit()
			imgNave = new Image() //ACA PONEN EL NOMBRE DE LA VARIABLE DE PEPITA QUE LE PUSIERON
			imgNave.src = url;
			imgNave.onload = function () {
				nave = new nave(canvas.width);
			}
			imgOvni.onload = function () {
				for (var i = 0; i < 5; i++) {
					for (var j = 0; j < 10; j++) {
						ovnis_array.push(new Enemigo(canvas.width / 5 + (canvas.width / 15) * j, canvas.height / 8 + (canvas.width / 25) * i));
					}
				}
				setTimeout(anima, 1500);
				disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
			}
		}
		else {
			alert("Error al crear tu contexto");
		}
	}
}

/*************  LISTENER  **************/
document.addEventListener("keydown", function (e) {
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
});

/******************* VARIABLES ********************/
let url
var centerX = canvas.width / 2;
var canvas, ctx;
let contador = 0;
let nro = 0;
let vida = 3;
var x = 100;
var y = 100;
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var imgNave, imgOvni, imgRey;
var municion = 100;
var ultimos = new Array();
var imgAni = 0;
var imgAni2 = 0;
var enemigosVivos = 50;
var tiempoBala = true;
var teclaPulsada = null;
var tecla = [];
var balas_array = new Array();
var ovnis_array = new Array();
var balasEnemigas_array = new Array();
var endGame = false;
var disparoEnemigo;
var tiempoDisparo = 1000; //Del Enemigo
var puntos = 0;
/***************** OBJETOS ******************/
function Bala(x, y, w) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.dibuja = function () {
		ctx.save();
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y - 5.5;//velocidad de la bala
		ctx.restore();
	};
	this.dispara = function () {
		ctx.save();
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y + 4.5;
		ctx.restore();
	};
}
function nave(x) {
	this.x = x;
	this.y = canvas.height / 1.2;
	this.w = canvas.width / 15;
	console.log(this.w)
	this.h = 45;
	this.dibuja = function (x) {
		this.x = x;
		if (imgAni2 < 5) {
			ctx.drawImage(imgNave, 0, 0, 300, 350, this.x, this.y, canvas.width / 14, canvas.height / 8);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
			checarBalas();
			//setInterval(checarBalas(),1000);
		} else if (imgAni2 < 10) {// 600, 0, 300, 350, this.x, this.y, 60,80);
			ctx.drawImage(imgNave, 300, 0, 300, 350, this.x, this.y, canvas.width / 14, canvas.height / 8);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
		} else {
			ctx.drawImage(imgNave, 300, 0, 300, 350, this.x, this.y, canvas.width / 14, canvas.height / 8);
			imgAni2 = 0;
		}


	};
}
function Enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.w = canvas.width / 15;
	this.veces = 0;
	this.dx = 5;
	this.ciclos = 0;
	this.num = 14;
	this.figura = true;
	this.vive = true;
	this.dibuja = function () {
		//Retraso
		if (this.ciclos > 20) {
			//saltitos
			if (this.veces > this.num) {
				this.dx *= -1;
				this.veces = 0;
				this.num = 28;
				this.y += 40;
				this.dx = (this.dx > 0) ? this.dx++ : this.dx--;
			} else {
				this.x += this.dx;
			}
			this.veces++;
			this.ciclos = 0;
			this.figura = !this.figura;
		} else {
			this.ciclos++;
		}
		if (this.vive) {
			if (imgAni < 4) {
				ctx.drawImage(imgOvni, 0, 0, 300, 300, this.x, this.y, 50, 50);
				//           (imgFile, xini, yini, wimg, himg, xpos  , ypos  , wrez, hrez)
			} else if (imgAni < 8) {
				ctx.drawImage(imgOvni, 300, 0, 300, 300, this.x, this.y, 50, 50);
			} else if (imgAni < 12) {
				ctx.drawImage(imgOvni, 600, 0, 300, 300, this.x, this.y, 50, 50);
			} else if (imgAni > 11) {
				ctx.drawImage(imgOvni, 900, 0, 300, 300, this.x, this.y, 50, 50);
				imgAni = 0;
			}
		} else {
			ctx.fillStyle = "black";
			ctx.fillRect(this.x, this.y, 35, 30);
		}
	};
}

/***************** FUNCIONES ******************/
function principal() {//MUESTRA EL MENSAJE DEL INICIO-PRINCIPAL
	mensaje("");
	ctx.textAlign = "center";
	ctx.fillText("Comienza el Juego", centerX, 100);
	ctx.fillText("Tenes 3 Vidas", centerX, 300);
	ctx.fillText("Balas: 100", centerX, 400);
}
function anima() {//ANIMA Y CONTROLA LA COLISION CON BALAS

	if (endGame == false) {
		verifica();
		pinta();
		colisiones();
		requestAnimationFrame(anima);
		for (var j = 0; j < balasEnemigas_array.length; j++) {
			bala = balasEnemigas_array[j];
			if (bala != null) {
				if ((bala.x > nave.x) &&
					(bala.x < nave.x + nave.w) &&
					(bala.y > nave.y) &&
					(bala.y < nave.y + nave.h)) {
					nro++;
					controlando()
				}
			}
		}
	}
}
function controlando() {//CONTROLA LA CANTIDAD DE VIDAS
	contador++;
	console.log("contador", contador, "nro", nro);
	if (contador == 11) {
		vida--;
		playVida()
		console.log("vida", vida)
		live()
	} else if (contador == 22) {
		vida--
		console.log("vida", vida)
		playVida()
	} else if (contador == 33) {
		playVida()
		playGameOver()
		gameOver()
	}
}
function mensaje(cadena) {//FUNCION UTILIZADA PARA MESAJES 
	var centerX = canvas.width / 2;
	ctx.textAlign = "center";
	ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 43px 'Press Start 2P', cursive ";
	ctx.fillText(cadena, centerX, (canvas.height) / 4);
}
function colisiones() {//COLISION DE BALA CON ENEMIGO
	for (var i = 0; i < ovnis_array.length; i++) {
		for (var j = 0; j < balas_array.length; j++) {
			enemigo = ovnis_array[i];
			bala = balas_array[j];
			if (enemigo != null && bala != null) {
				if ((bala.x > enemigo.x) &&
					(bala.x < enemigo.x + enemigo.w) &&
					(bala.y > enemigo.y) &&
					(bala.y < enemigo.y + enemigo.w)) {
					enemigo.vive = false;
					enemigosVivos = enemigosVivos - 1;
					ovnis_array[i] = null;
					balas_array[j] = null;
					puntos += 10;
					score();
				}
			}
		}
	}
}

function finalNivel() {
  
        console.log("final")
        let button = document.getElementById('siguiente')
        button.classList.remove('hidden')
 }
function gameOver() {//MUESTRA LOS CARTELES CORRESPONDIENTES
	if (enemigosVivos == 0) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		balas_array = [];
		ovnis_array = [];
		balasEnemigas_array = [];
		mensaje("GANASTE")
		var imgGana = new Image();
		imgGana.src = fin;
		imgGana.onload = function () {
			ctx.drawImage(imgGana, (canvas.width) / 4, canvas.height / 3);
		}
		$('#gameWin').button('show');
		finalNivel();
	}
	else if (contador == 33) {
		mensaje("GAME OVER")
		var imgPierde = new Image();
		imgPierde.src = "img/marcianito_llora.png";
		imgPierde.onload = function () {
			ctx.textAlign = "center";
			ctx.drawImage(imgPierde, canvas.width/2.7,canvas.height/3);
		}
		$('#gameOver').modal('show');
		finalNivel()
	}
	endGame = true;
	clearTimeout(disparoEnemigo);
}
function score() {//MUESTRA EL SCORE OBTENIDO
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 25, canvas.width, 20);
	ctx.font = "bold 14px 'Press Start 2P', cursive ";
	ctx.fillText("SCORE: " + puntos, canvas.width / 10, 20);
	ctx.restore();
}
function municiones() { //MUESTRA LA CANTIDAD DE DISPAROS QUE NOS QUEDAN
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 50, canvas.width, 20);
	ctx.font = "bold 14px 'Press Start 2P', cursive ";
	ctx.fillText("Munición: " + municion, canvas.width / 8, 50);
	ctx.restore();

	// ctx.save();
	// ctx.fillStyle = "white";
	// ctx.clearRect(0, 60, canvas.width, 40);
	// ctx.font = "bold 14px 'Press Start 2P', cursive ";
	// ctx.fillText("Munición: " + municion, canvas.width / 10, 40);
	// ctx.restore();
}
function live() {//MUESTRA LAS VIDAS 
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 90, canvas.width, canvas.height / 50);
	ctx.font = "bold 14px 'Press Start 2P', cursive ";
	ctx.fillText(vida + " :VIDAS", canvas.width / 1.15, 30);
	ctx.restore();
}
function verifica() {//VERIFICA LAS TECLAS
	if (tecla[teclaDerecha]) x += 5;
	if (tecla[teclaIzquierda]) x -= 5;
	//Verifica cañon
	if (x > canvas.width - 20) x = canvas.width - 20;
	if (x < 0) x = 0;
	//Disparo
	if (tecla[teclaEspacio]) {
		// //activar sonido de disparo
		playTiro()
		if (tiempoBala == true && municion != 0) {
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 30, nave.y - 3, 5));
			(municion > 0) ? municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function () { tiempoBala = true; }, 300);
		}
	}
}
function checarBalas() {//CONTROL DE BALAS
	var balasArrayVal = 0;
	for (let i = 0; i < balas_array.length; i++) {
		if (balas_array[i] != null) {
			balasArrayVal = 1;
		}
	}
	if (municion == 0 && balas_array.length == 100 && balasArrayVal == 0 && enemigosVivos > 0) {
		tecla[teclaEspacio] = false;
		alert("Sin munición");
		gameOver();
	}
}
function pinta() {//PINTA ENEMIGOS Y BALAS
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	score();
	municiones();
	live()
	nave.dibuja(x);//Esto es lo que hace que se muestre
	//Balas
	for (var i = 0; i < 100; i++) {
		if (balas_array[i] != null) {
			balas_array[i].dibuja();
			if (balas_array[i].y < 0) balas_array[i] = null;
		}
	}
	//Balas Enemigas
	for (var i = 0; i < balasEnemigas_array.length; i++) {
		if (balasEnemigas_array[i] != null) {
			balasEnemigas_array[i].dispara();
			if (balasEnemigas_array[i].y > canvas.height) balasEnemigas_array[i] = null;
		}
	}
	//Enemigos
	numEnemigos = 0;
	for (var i = 0; i < ovnis_array.length; i++) {
		if (ovnis_array[i] != null) {
			ovnis_array[i].dibuja();
			if (ovnis_array[i].y == nave.y) {
				gameOver();
			}
			numEnemigos++;
		}
	}
	if (numEnemigos == 0) gameOver();
}
function disparaEnemigo() {//DISPARO ALEATORIO DEL ENEMIGO
	for (var i = ovnis_array.length - 1; i > 0; i--) {
		if (ovnis_array[i] != null) {
			ultimos.push(i);
		}
		if (ultimos.length >= 10) break;
	}
	Array.prototype.clean = function (deleteValue) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == deleteValue) {
				this.splice(i, 1); i--;
			}
		} return this;
	};
	ovnis_array.clean(undefined);
	d = ultimos[Math.floor(Math.random() * ovnis_array.length)];
	if (ovnis_array[d] == null || d == null) {
		ovnis_array.clean(undefined);
		d = Math.floor(Math.random() * ovnis_array.length);
	}
	balasEnemigas_array.push(new Bala(ovnis_array[d].x + ovnis_array[d].w / 2, ovnis_array[d].y, 5));
	clearTimeout(disparoEnemigo);
	disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
}

/***************** AUDIOS ******************/
function playTiro() {
	let paso = new Audio("sound/piu.wav");
	paso.play();
}
function playVida() {
	let paso = new Audio("sound/vida.mp3");
	paso.play();
}
function playGameOver() {
	let paso = new Audio("sound/GameOver.mp3");
	paso.play();
}

/*****************CAMBIO DE PERSONAJES ******************/
let fin;
function obteneroutfit() {
	url = localStorage.getItem("url")
	
	switch (url) {
		case "img/pepitatraje/pepitawonderwoman.png":
			url = "img/pepitatraje/naveWonder.png";
			fin="img/pepitatraje/pepiwonderwoman.png";
			break;
		case "img/pepitatraje/pepitakillbill.png":
			url = "img/pepitatraje/naveKillbill.png";
			fin ="img/pepitatraje/pepikillbill.png"
			break;
		case "img/pepitatraje/pepitabruja.png":
			url = "img/pepitatraje/naveBruja.png";
			fin = "img/pepitatraje/pepibruja.png"
			break;
		case "img/pepitatraje/pepitajedi.png":
			url = "img/pepitatraje/naveJedi.png";
			fin = "img/pepitatraje/pepijedi.png"
			break;

		default:
			url = "img/pepitatraje/navePepita.png";
			fin ="img/pepitatraje/pepiorigin.png"
			break;
	}
}
