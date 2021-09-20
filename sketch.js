var jake, jakeAn;
var path, pathImg;
var leftwall, rightwall;
var coin = [];
var bomb = [];
var coinImg, bombImg;
var Ccount = 1;
var Bcount = 1;
var Ccountr = 1;
var Bcountr = 1;
var gameOver = false;

function preload(){
  //pre-load images
  jakeAn = loadAnimation("Jake1.png", "Jake2.png", "jake3.png", "jake4.PNG")
  pathImg = loadImage("path.png")
  coinImg = loadImage("coin.png")
  bombImg = loadImage("bomb.png")
}

function setup(){
  createCanvas(400,400);
  //create sprites here
  
  path = createSprite(185,200)
  path.addImage(pathImg)
  path.velocityY = 10;
  path.scale = 1.5;

  jake = createSprite(200,350)
  jake.addAnimation("jakerunning",jakeAn)
  jake.scale = 0.5;

  leftwall = createSprite(0,200,20,400)
  leftwall.visible = false;
  rightwall = createSprite(400,200,20,400)
  rightwall.visible = false;

  jake.collide(leftwall)
  jake.collide(rightwall)
  
}

function draw() 
{
  background(0);
  drawSprites();
  createCoins();
  createBombs();
  createBombs();

  jake.x = World.mouseX
  
  if(path.y > 400)
  {
    path.y = height/2;
  }

      if(gameOver == true)
    {
      fill("limegreen")
      textSize(40)
      stroke("red")
      strokeWeight(4)
      text("Game Over", 90,200)
    }
}

function createCoins()
{
  if(gameOver == false)
  {
  if(frameCount % 50 == 0)
  {
    coin[Ccount] = createSprite(300,-100);
    coin[Ccount].lifetime=300;
    coin[Ccount].x = Math.round(random(50,350))
    coin[Ccount].y = Math.round(random(-300,-200))
    coin[Ccount].addImage(coinImg);
    coin[Ccount].velocityY = 15;
    coin[Ccount].scale = 0.35;
    Ccount++;
  }
  
  for (var a = Ccountr; a < Ccount; a++)
  {
    if(coin[a].isTouching(jake))
    {
      coin[a].destroy();
      Ccountr=a;
    }
  }
}
}

function createBombs()
{
  if(gameOver == false)
  {  
  
    if(frameCount % 80 == 0)
  {
    bomb[Bcount] = createSprite(300,-100);
    bomb[Bcount].lifetime=300;
    bomb[Bcount].x = Math.round(random(10,390))
    bomb[Bcount].y = Math.round(random(-300,-200))
    bomb[Bcount].addImage(bombImg);
    bomb[Bcount].velocityY = 16;
    bomb[Bcount].scale = 0.08;
    Bcount++;
  }
  
  for (var a = Bcountr; a < Bcount; a++)
  {
    if(bomb[a].isTouching(jake))
    {
      bomb[a].destroy();
      jake.destroy();
      path.velocityY = 0;
      //bomb[Bcount].velocityY = 0;
      gameOver = true;
      //bomb[Bcount].lifetime = 0;
    }
  }
}
}
