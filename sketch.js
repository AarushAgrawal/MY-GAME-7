var score = 0;
var zombieGroup,bulletGroup;
var gameState = 0;
var lifelines = 3;
var zombies;
var desert,forest;

function preload() {
  desertImg = loadImage("sprites/background.jpg");
   zombiesImg = loadImage("sprites/zombie.png");
   manImg = loadImage("sprites/man.png");
   bulletImg = loadImage("sprites/bullet.png");
   forestImg = loadImage("sprites/background1.jpg");
   zombies1Img = loadImage("sprites/zombie2.png")
}

function setup() {
  createCanvas(1200,600);
  bg = createSprite(600,400,100,400);
  bg.addImage("desert",desertImg);
  bg.addImage("forest",forestImg);
  bg.scale = 2;
 
 // forest = addImage("building1");

  zombieGroup = new Group();
  bulletGroup = new Group();
  humanGroup = new Group();
  zombieGroup1 = new Group();

 man = createSprite(50,540,30,70);
 man.addImage("man",manImg); 

 
// ground = createSprite(700,450,1000,20);
}

function draw() {
  background(0); 

  man.y = mouseY;

  for(var i = 0 ; i < (zombieGroup).length ; i++){
    z = (zombieGroup).get(i);
    if(z.x < man.x){
      lifelines = lifelines - 1;
      if(lifelines === 0){
        gameState = 1;
        break;
      }
     console.log(lifelines);
    }
  }

 
  if(gameState === 0){

  spawnZombies(); 


 for(var i = 0 ; i< (zombieGroup).length ;i++){
    temp = (zombieGroup).get(i) ; 
    
    for(var j= 0 ; j< (bulletGroup).length ;j++){ 
      tem=(bulletGroup).get(j);
       //console.log(temp,tem);
        if (tem.collide(temp)) { 
          tem.destroy();
           temp.destroy(); 
           // bulletGroup.destroyEach();
            score = score + 1; 
            break;
           }
           } 
          } 
          if(keyWentDown("space")){ 
            spawnBullets();
           }
        
        
          }

          if(score === 10){
          gameState = 2;
          zombieGroup.destroyEach();
          bulletGroup.destroyEach();
          }
  
  drawSprites();

  if(gameState === 1){
    zombieGroup.setVelocityXEach(0);
    zombieGroup.setLifetimeEach(-1);
    textSize(150)
    fill("red")
    text("GAME OVER",200,350)
}

  if(gameState === 2){
    console.log("build");
    bg.changeImage("forest",forestImg);
    bg.scale = 1;

    spawnZombies2();

    for(var i = 0 ; i < (zombieGroup1).length ; i++){
      z = (zombieGroup1).get(i);
      if(z.x < man.x){
        lifelines = lifelines - 1;
        if(lifelines === 0){
          gameState = 1;
          break;
        }
       console.log(lifelines);
      }
    }

 for(var i = 0 ; i< (zombieGroup1).length ;i++){
  temp = (zombieGroup1).get(i) ; 
  
  for(var j= 0 ; j< (bulletGroup).length ;j++){ 
    tem=(bulletGroup).get(j);
     //console.log(temp,tem);
      if (tem.collide(temp)) { 
        tem.destroy();
         temp.destroy(); 
         // bulletGroup.destroyEach();
          score = score + 1; 
          break;
         }
         } 
        } 
        
  if(keyWentDown("space")){ 
    spawnBullets();
   }

      }

  
  noStroke();
  textSize(35)
  fill("red")
  text("Score  " + score, 900, 50)
}

 function spawnZombies(){
   if(World.frameCount % 10 === 0) {
        zombies = createSprite(1150,random(250,550),10,50);
         zombies.addImage("zombie",zombiesImg);
         zombies.scale = 0.2;
         zombies.velocityX = -7;
         zombies.lifetime = 240;
         drawSprites();
          zombieGroup.add(zombies);
     }
}

function spawnBullets(){
   var bullet = createSprite(100,530,10,5);
        bullet.y = mouseY;
        bullet.addImage("bullet",bulletImg);
        bullet.scale = 0.1;
         bullet.velocityX = 5;
         bullet.lifetime = 250;
          bulletGroup.add(bullet);
}

function spawnZombies2(){
  if(World.frameCount % 10 === 0) {
       zombies1 = createSprite(1150,random(250,550),10,50);
        zombies1.addImage("zombie2",zombies1Img);
        zombies1.scale = 0.5;
        zombies1.velocityX = -7;
        zombies1.lifetime = 240;
        drawSprites();
         zombieGroup1.add(zombies1);
    }
}