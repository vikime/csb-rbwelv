var canvas = document.getElementById("canvas-new");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius =10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var rightMove = false;
var leftMove = false;
var brickRow = 4;
var brickColumn = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;


var bricks = [];
for(var c=0;c<brickColumn;c++){
    bricks[c]=[];
    for(var r=0;r<brickRow;r++){
      bricks[c][r]={x:0,y:0,status : 1};
    }
}



document.addEventListener("keydown",keyDownHolder,false);
document.addEventListener("keyup",keyUpHolder,false);

function keyDownHolder(e){
	if(e.key == "right" || e.key == "ArrowRight"){
  	rightMove =true;
  }
  else if(e.key == "left"  || e.key == "ArrowLeft"){
  leftMove = true;
  }
}

function keyUpHolder(e){
	if(e.key == "right" || e.key == "ArrowRight"){
  	rightMove =false;
  }
  else if(e.key == "left"  || e.key == "ArrowLeft"){
  leftMove = false;
  }
}




function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
 
 
 function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumn; c++) {
        for(var r=0; r<brickRow; r++) {
        if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "brown";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function printScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

function printLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "orange";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collisionDetection() {
    for(var c=0; c<brickColumn; c++) {
        for(var r=0; r<brickRow; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                     if(score == brickRow*brickColumn) {
                          alert("YOU WIN, CONGRATS!");
                          document.location.reload();
                           // Needed for Chrome to end game
                        }
                }
            }
            
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
   	drawPaddle();
    printScore();
    printLives();
   collisionDetection();
    
     if(x+dx >canvas.width-ballRadius || x+dx <ballRadius){
    dx = -dx;
    }
    
    
    if(y+dy < ballRadius){
    dy = -dy;
    }
    
    else if( y+dy >canvas.height-ballRadius ){
     if(x > paddleX && x < paddleX + paddleWidth){
     	dy =  -dy;
     }
       else {
             lives--;
              if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                }
                      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
      
        }
    }
    
   
   
   if(rightMove &&  paddleX < canvas.width-paddleWidth){
   	paddleX +=8;
   
   }
   else if(leftMove && paddleX>0){
   paddleX -=8;
   
   }
    
     x += dx;
    y += dy;
}

var Interval = setInterval(draw, 15);