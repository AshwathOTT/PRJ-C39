var mario , mario_running,ground_run,groundImage,gro;
var coin ,coinImage, obstacle, obstacleImage;
var Group, obstacleGroup;
var survivalTime = 0;
var gameState = "play";
var score,restartImage,rs,gameOverImage,gameOver;

function preload(){
  mario_running = loadAnimation("sprite_1.png","sprite_2.png")
  coinImage = loadImage("Coin.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  restartImage = loadImage("rs.webp");
  gameOverImage = loadImage("gameovr.png");
}

function setup() {
  createCanvas(600,600);
  score=0;
  
  ground_run = createSprite(0,0,10,10);
  ground_run.addAnimation("groundrunning",groundImage);
  ground_run.scale=1.6;
  ground_run.velocityX=-4;
  
  mario=createSprite(50,300,10,10);
  mario.addAnimation("run",mario_running);
  mario.scale=0.1;
   
  gro = createSprite(40,320,1100,10);
  gro.visible = false;
  
  gameOver=createSprite(300,290);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale=1;
  gameOver.visible = false;
  
  
  rs=createSprite(300,350);
  rs.addImage("reset",restartImage);
  rs.scale=0.1;
  rs.visible = false;
  
  powerGroup = new Group();
  obstaclesGroup = new Group();
}

function draw()
{
    background(180);
    mario.collide(gro);
    if(gameState == "play" )
      {
        survivalTime = survivalTime+1;
        if(ground_run.x < 0)
            {
              ground_run.x = ground_run.width/2; 
            }
        if(keyDown("space"))
            {
              mario.velocityY=-10;
            }
            mario.velocityY = mario.velocityY + 0.8;
        if(World.frameCount%80==0)
            {
              power();
            }  
        if(World.frameCount%300==0)
            {
              obstacles();
            }
        if(powerGroup.isTouching(mario))
            {
              powerGroup.destroyEach();  
              score=score+1;
            } 
      }
        if(obstaclesGroup.isTouching(mario))
            {
              gameState = "end";
            }
  
        if(gameState == "end")
            {
              ground_run.velocityX = 0;
          powerGroup.setLifetimeEach(0); 
              obstaclesGroup.setLifetimeEach(0);
              mario.velocityY= 0;
              rs.visible = true;
              gameOver.visible = true;
              
            }
  
  if(mousePressedOver(rs)&&gameState == "end") 
   {
    gameState = "play";
    gameOver.visible = false;
    rs.visible = false;
    score = 0;
    ground_run.velocityX=-4;
   }
    drawSprites();
    text("Survival Time:"+ survivalTime,60,80);
    text("SCORE:"+score,60,100);
}

function power() 
  {
     coin = createSprite(200,250,10,10);
     coin.addImage("power",coinImage);
     coin.scale=0.1;
     coin.y=Math.round(random(120,250));
     coin.lifetime = 600/5;
     coin.velocityX=-5;
     powerGroup.add(coin);
  }
function obstacles() 
  {
     obstacle = createSprite(570,300,10,10);
     obstacle.addImage("hit",obstacleImage);
     obstacle.scale=0.1;
     obstacle.y =300;
     obstacle.lifetime = 600/5;
     obstacle.velocityX = -5;
     obstaclesGroup.add(obstacle);
   }