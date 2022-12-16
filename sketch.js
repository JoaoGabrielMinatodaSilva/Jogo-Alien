var bg, bgImage;
var nave, meteoro, navealien, bala;
var alienGroup, meteoroGroup, municaoGroup;
var life = 3;
var tiro = 100;
var kill = 0;
var PLAY = 0;
var END = 1;
var WIN = 2;
var gameState = PLAY;



function preload(){
  bgImage = loadImage("./assets/bg.PNG");
  naveImage = loadImage("./assets/nave2.png");
  navealienImage = loadImage("./assets/navealien.png");
  meteoroImage = loadImage("./assets/meteoro.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2, height/2);
  bg.addImage(bgImage);
  bg.scale = 1.5

  nave = createSprite(300,300);
  nave.addImage(naveImage);
  nave.scale = 0.4

  alienGroup = new Group();
  meteoroGroup = new Group();
  municaoGroup = new Group();

  

}

function draw() {
  background(0); 

  if(gameState === PLAY){

    if(keyDown(UP_ARROW)){
      nave.y = nave.y -5
    }

    if(keyDown(DOWN_ARROW)){
      nave.y = nave.y +5
    }

    if(keyDown(LEFT_ARROW)){
      nave.x = nave.x -5
    }

    if(keyDown(RIGHT_ARROW)){
      nave.x = nave.x +5
    }

    alien();
    obstacle();

    if(keyDown("space")){
      tiros()
    }
      
    for(var i = 0; i < municaoGroup.length; i++){
      if(municaoGroup[i].isTouching(alienGroup)){
        municaoGroup[i].destroy();
      }
      matar();
    }

    for(var i = 0; i < meteoroGroup.length; i++){
      if(nave.isTouching(meteoroGroup[i])){
        life = life -1
        meteoroGroup[i].destroy();
      }
    }
  } else if(gameState === END){



  } 

  drawSprites();

  textSize(20);
  fill("orange");
  text("Vidas: "+ life,50,50);
  text("Munição: "+ tiro,50,75);
  text("Eliminações "+ kill,50,100);


  if(gameState === WIN){



  }

}

function alien(){
  if(frameCount%60 === 0){
    x = Math.round(random(50,width-50))
    navealien = createSprite(x, 0);
    navealien.addImage(navealienImage);
    navealien.scale = 0.25
    navealien.velocityY = 3
    navealien.velocityX = Math.round(random(-3, 3))
    alienGroup.add(navealien);

    navealien.setCollider("circle",0,0,100)
    navealien.debug = true
  } 
}

function obstacle(){
  if(frameCount%90 ===0){
      x = Math.round(random(50,width-50))
      meteoro = createSprite(x, 0);
      meteoro.addImage(meteoroImage);
      meteoro.scale = 0.25
      meteoro.velocityY = 3
      meteoro.velocityX = -3
      meteoroGroup.add(meteoro);

      meteoro.setCollider("circle",0,0,100)
      meteoro.debug = true
  }
}

function tiros(){
    bala = createSprite(nave.x,nave.y,5,10);
    bala.velocityY = -4
    municaoGroup.add(bala);
}

function matar(){
  for(var i = 0; i < alienGroup.length; i++){
    if(nave.isTouching(alienGroup[i])){
      life = life -1
      alienGroup[i].destroy();
    }
  }
}