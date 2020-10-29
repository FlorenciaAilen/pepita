var myGamePiece;
var myObstacles = [];
var myObstacles2 = [];
var myBackground;
var door = null;

const canvasWith = window.innerWidth * 0.7;
const canvasHeight = window.innerHeight * 0.8;

let points = 0;


function startGame() {
    myGamePiece = new component(60, 60, "/img/pepita.png", 10, 120, "image");
    myBackground = new component(canvasWith, canvasHeight, "https://i.pinimg.com/originals/84/c2/a2/84c2a238750dd630e0129f4451ba2092.jpg", 0, 0, "image");
    myGamePiece.gravity = 0.05;
    myObstacles2.push(new component(1000000000000000000000000000000000000000000, 1, "red", 0, 0));
    myObstacles2.push(new component(1000000000000000000000000000000000000000000, 1, "red", 0, canvasHeight));
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

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.text = color;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
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

            ctx.drawImage(image,
                this.x,
                this.y,
                this.width, this.height);
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
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
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
        myObstacles.push(new component(20, height, "img/obstacle2.png", x, 0, "image"));
        myObstacles.push(new component(20, x - height - gap, "img/obstacle.png", x, height + gap, "image"));
    }
    if (door == null && points / 2 == 5) {
        door = new component(115 / 2, 148 / 2, "/img/door.png", canvasWith, canvasHeight / 4, "image");
    }
    if (door != null) {
        if (myGamePiece.crashWith(door)) {
            window.location.replace("/six"); // PONER URL DE SIGUIENTE NIVEL
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