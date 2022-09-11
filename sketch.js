var sky,airballoon,coin1,coin2,obstacle;
var skyImg,airballoonImg,coin1Img,coin2Img,obstacleImg;
var coins = 0;
var coin1G,obstacleG;
var score = 0;
var score = 0;


var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
    skyImg = loadImage("sky.png");
    airballoonImg = loadImage("airballoon.jpg");
    coin1Img = loadImage("coin.png");
    
    obstacleImg = loadImage("obstacle.png");
    
    
}

function setup()
{
    createCanvas(400,600);
      
    sky=createSprite(200,200);
    sky.addImage(skyImg);
    sky.velocityY = (3 + 2* coins/100);
    
    
    //creating boy running
    airballoon = createSprite(70,420,20,20);
    airballoon.addImage(airballoonImg);
    airballoon.scale=0.15;

   
    
    coin1G = new Group();
    
    obstacleG = new Group();
}

function draw()
{
    if(gameState===PLAY){
        background(0);
        airballoon.x = World.mouseX;
        
        edges = createEdgeSprites();
        airballoon.collide(edges);
        
        //code to reset the background
        if(sky.y > 400 ){
          sky.y = height/2;
        }
        
          createCoin1();
          
          createObstacle();
      
          if (coin1G.isTouching(airballoon))
           {
            coin1G.destroyEach();
            coins=coins+10;
           }

        
            
           else
          {
             if(obstacleG.isTouching(airballoon))
             {
               gameState=END;
             
              
               coin1G.destroyEach();
               
               obstacleG.destroyEach();
                         
               coin1G.setVelocityYEach(0);
               
               obstacleG.setVelocityYEach(0);
      
               //create a sprite
               swal(
                {
                  title: 'Game Over!!!',
                  confirmButtonText: "Play Again"
                },
                function(isConfirm){
                  if(isConfirm){
                    location.reload();
                  }
                }
              );
             
            }
        }
        
               drawSprites();
               textSize(20);
               fill("red");
               text("Coins: "+ coins,10,30);
        }
}

function createCoin1()
 {
  if (World.frameCount % 120 == 0)
  {
   coin1 = createSprite(Math.round(random(50, 350),40, 10, 10));
   coin1.addImage(coin1Img);
   coin1.scale=0.05;
   coin1.velocityY = (3 + 2* coins/100);
   coin1.lifetime = 150;
   coin1G.add(coin1);
  }
}



function createObstacle()
{
  if (World.frameCount % 430 == 0)
 {
   obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
   obstacle.addImage(obstacleImg);
   obstacle.scale=1.0;
   obstacle.velocityY = (3 + 2* coins/100);
   obstacle.lifetime = 200;
   obstacleG.add(obstacle);
  }
}
