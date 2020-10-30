var myGamePiece;
var myObstacles = [];
var myObstacles2 = [];
var myBackground;
var door = null;

const canvasWith = window.innerWidth * 0.7;
const canvasHeight = window.innerHeight * 0.7;

let points = 0;



let url
function obteneroutfit() {
    url = localStorage.getItem("url")
}

obteneroutfit()

// component(width, height, color, x, y, type, frameX, frameY, width2, height2)
function startGame() {
    myGamePiece = new component(709 / 8, 610 / 6, url, 10, 120, "image", 0, 5, 70, 79);
    myBackground = new component(canvasWith, canvasHeight, "https://i.pinimg.com/originals/84/c2/a2/84c2a238750dd630e0129f4451ba2092.jpg", 0, 0, "image", 0, 0, canvasWith, canvasHeight);
    myGamePiece.gravity = 0.05;
    myObstacles2.push(new component(0, 0, "red", 0, 0, 0, 0, 1000000000000000000000000000000000000000000, 1));
    myObstacles2.push(new component(0, 0, "red", 0, canvasHeight, 0, 0, 1000000000000000000000000000000000000000000, 1));
    document.addEventListener("keydown", (e) => {
        if (e.key == " ") {
            e.preventDefault();
            accelerate(-0.2);
        }
    })
    document.addEventListener("keyup", (e) => {
        if (e.key == " ") {
            e.preventDefault();
            accelerate(0.05);
        }
    });


    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = canvasWith;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game").append(this.canvas)
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, canvasHeight, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, frameX, frameY, width2, height2) {
    this.type = type;
    this.score = 0;
    this.text = color;
    this.frameX = frameX;
    this.frameY = frameY;
    this.width = width; //
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.width2 = width2;
    this.height2 = height2;

    this.gravity = 0;
    this.gravitySpeed = 0;
    this.pointed = false;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + "px Arial";
            ctx.fillStyle = "black"
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "image") {
            const image = new Image();
            image.src = color;
            //tx.drawImage(characterSprite,character.width * character.frameX,character.height *character.frameY,character.width,character.height,character.x,character.y,character.width2,character.height2)
            ctx.drawImage(image, this.width * this.frameX, this.height * this.frameY, this.width, this.height,
                this.x,
                this.y,
                this.width2, this.height2);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height2;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width2);
        var mytop = this.y;
        var mybottom = this.y + (this.height2);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width2);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height2);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    this.passed = function (otherobj) {
        var myX = this.x;
        var otherX = otherobj.x;
        var passed = false;
        if ((myX > otherX)) {
            passed = true;
        }
        return passed;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            window.location.reload();
            return;
        }
        if (!myObstacles[i].pointed && myGamePiece.passed(myObstacles[i])) {
            points++;
            myObstacles[i].pointed = true;
        }
    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles2[i])) {
            window.location.reload();
            return;
        }
    }
    myGameArea.clear();
    myBackground.update();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(281, 2803, "img/obstacle2.png", x, 0, "image", 0, 0, 20, height));
        myObstacles.push(new component(281, 2803, "img/obstacle.png", x, height + gap, "image", 0, 0, 20, x - height - gap));
    }
    if (door == null && points / 2 == 5) {
        door = new component(115, 148, "img/door.png", canvasWith, canvasHeight / 4, "image", 0, 0, 115, 148);

    }
    if (door != null) {
        if (myGamePiece.crashWith(door)) {
            window.location.replace("/cinco.html"); // PONER URL DE SIGUIENTE NIVEL
        }
        if (myGamePiece.passed(door)) {
            window.location.reload();
        }
        door.speedX = -2;
        door.update();
        door.newPos();
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}