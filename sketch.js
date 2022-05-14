//Game States
var START=0;
var PLAY=1;
var END=2;
var gameState=START;
var score=0;
var life=3;

function preload(){
  bg1Image=loadImage(" Space 3.jpg")
  startImage=loadImage("Start.png")
  bg2Image=loadImage("spac4.jpg")
  spaceimage=loadImage("sp.png")
  fireballImage=loadImage("fireball.png")
  alien1Image=loadImage("alien 1.png")
  alien2Image=loadImage("Alien 2.png")
  restartImage=loadImage("restart.png")
  themesound=loadSound("Theme.mp3")
  shootingsound=loadSound("shooting.mp3")
  winsound=loadSound("win.mp3")
  diesound=loadSound("die.mp3")
  laserimage=loadImage("laser.gif")

  
}

function setup(){
  
//create a canvas
createCanvas(windowWidth,windowHeight)
back1=createSprite(width/2,height/2)
back1.addImage(bg1Image)
back1.scale=0.6
startbtn=createSprite(width/2-450,height/2+100)
startbtn.addImage(startImage)
startbtn.scale=0.3
back2=createSprite(width/2,height/2)
back2.addImage(bg2Image)
//back2.scale=0.9
back2.visible=false
player=createSprite(width/2,height-80)
player.addImage(spaceimage)
player.scale=0.5
player.visible=false
restart=createSprite(width/2,height/2)
restart.addImage(restartImage)
restart.scale=0.5
restart.visible=false
fireballgroup=createGroup()
alien1group=createGroup()
alien2group=createGroup()
themesound.loop()

}

function draw() {
background(0)
drawSprites()
fill ("yellow")
textSize(30)
text("Score: "+score,width-300,80)
text("Lives: "+life,width-300,120)

if (gameState===START){
  restart.visible=false

  if (mousePressedOver(startbtn)){
    gameState=PLAY
  }
}
if (gameState===PLAY){
  back1.visible=false
  startbtn.visible=false
  back2.visible=true
  player.visible=true
  back2.velocityY=4
  if (back2.y>windowHeight-250){
    back2.y=windowHeight/2
    
  }
  player.x=mouseX
  var select=Math.round(random(1,2))
  if (frameCount%80===0){
    if (select===1){
      spawnalien1()
    }
    if (select===2){
      spawnalien2()
    }
  }
  if (keyWentDown("space")){
    createfireball()
    shootingsound.play()
  }
  //destroying alien1 by fireball
  for (var fb=0;fb<fireballgroup.length;fb++){
    for (var a1=0;a1<alien1group.length;a1++){
      if (fireballgroup.isTouching(alien1group)){
        alien1group.get(a1).remove()
        fireballgroup.get(fb).lifetime=0
        score=score+50
      }
    }
  }
  for (var fb1=0;fb1<fireballgroup.length;fb1++){
    for (var a2=0;a2<alien2group.length;a2++){
      if (fireballgroup.isTouching(alien2group)){
        alien2group.get(a2).remove()
        fireballgroup.get(fb1).lifetime=0
        score=score+50
      }
    }
  }
  if(alien1group.isTouching(player)||alien2group.isTouching(player)){
    life=life-1
    diesound.play()
    gameState=END
  }
}
else if (gameState===END){
  back2.velocityY=0
  alien1group.destroyEach()
  alien2group.destroyEach()
  player.destroy()
  if (life>=1){
restart=createSprite(width/2,height/2)
restart.addImage(restartImage)
restart.scale=0.5
restart.visible=true
textSize(20)
fill("red")
text("TRY AGAIN...",width/2-50,height/2+100)
if (mousePressedOver(restart)){
  reset()
}
  }
  else {
    restart.visible=false
    textSize(40)
    fill("red")
    strokeWeight(5)
    text("SORRY!!! YOU LOST",width/2-100,height/2+50)
  }
}
if (score===1500&&gameState===PLAY){
  winsound.play()
  gameState=START
  score=0
  life=3
}
}
function reset(){
  gameState=PLAY
  back2=createSprite(width/2,height/2)
back2.addImage(bg2Image)


player=createSprite(width/2,height-80)
player.addImage(spaceimage)
player.scale=0.5
player.x=mouseX
}
function createfireball(){
  fireball=createSprite(200,500)
  fireball.addImage(fireballImage)
  fireball.x=player.x
  fireball.velocityY=-8
  fireball.lifetime=800
  fireball.scale=0.1
  fireballgroup.add(fireball)
}
function spawnalien1(){
  alien1=createSprite(random(width/2-750,width/2+750),20)
  laser1=createSprite(random(width/2-750,width/2+750),20)
 
  laser1.addImage(laserimage)
  laser1.x=alien1.x
  
  laser1.y=alien1.y+180
  

  alien1.addImage(alien1Image)
  alien1.velocityY=8+score/100
  laser1.velocityY=alien1.velocityY
  alien1.scale=0.4
  alien1.lifetime=800
  alien1group.add(alien1)
}

function spawnalien2(){
  alien2=createSprite(random(width/2-750,width/2+750),20)
  laser2=createSprite(random(width/2-750,width/2+750),20)
 
  laser2.addImage(laserimage)
  laser2.x=alien2.x
  
  laser2.y=alien2.y+180
  alien2.addImage(alien2Image)
  alien2.velocityY=8+score/100
  laser2.velocityY=alien2.velocityY
  alien2.scale=0.4
  alien2.lifetime=800
  alien2group.add(alien2)
}
