  
var towerImg, tower;
var potImg, pot, potsGroup;
var climberImg, climber, climbersGroup;
var hada, hadaImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  potImg = loadImage("pot.png");
  climberImg = loadImage("climber.png");
  hadaImg = loadImage("hada.png");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  potsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  hada = createSprite(200,200,50,50);
  hada.scale = 0.3;
  hada.addImage("hada.png", hadaImg);
}


function draw() {
  background(255);
 
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        hada.x = hada.x - 3;

    }
    if(keyDown("right_arrow")){
  
          hada.x = hada.x + 3;

      
    }
    if(keyDown("space")){
  
         hada.velocityY = -10;
      
    }
  
  hada.velocityY = hada.velocityY + 0.8;
  
   
      if(tower.y > 400){
        tower.y = 300
      } 
      spawnPots();

  
     if(climbersGroup.isTouching(hada)){
      hada.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(hada) || hada.y > 600){
      hada.destroy();
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}

function spawnPots()
 {
  if (frameCount % 240 === 0) {
    var pot = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //agregar la función random
    pot.x=Math.round(random(120,400));
    climber.x=pot.x;
    invisibleBlock.x=pot.x;
    //
    pot.addImage(potImg);
    climber.addImage(climberImg);
    pot.scale= 0.1;
    pot.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    
     
    hada.depth = pot.depth;
    hada.depth +=1;
    

    pot.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
     potsGroup.add(pot);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

