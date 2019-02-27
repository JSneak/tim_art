var color_x = 150
var color_y = 200
var color_z = 250
var speed = .99
var Image
var angle = 1.57;
var GRAVITY = 0.3;


var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;


var bargoSprites;

var player;


function preload() {
  Image = loadImage("./timbargo1.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(color_x, color_y, color_z);

    groundSprites = new Group();

    numGroundSprites = width/GROUND_SPRITE_WIDTH+1;

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    player = createSprite(100, height-75, 50, 50);

    bargoSprites = new Group();

}

function draw() {
  background(color_x, color_y, color_z);

  player.velocity.y = player.velocity.y + GRAVITY;

 if (groundSprites.overlap(player)) {
     player.velocity.y = 0;
     player.position.y = (height-50) - (player.height/2);
 }

  player.position.x = player.position.x + 5;
  camera.position.x = player.position.x + (width/4);

  var firstGroundSprite = groundSprites[0];
  if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
     groundSprites.remove(firstGroundSprite);
     firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
     groundSprites.add(firstGroundSprite);
  }


  if (keyDown(RIGHT_ARROW)) {
    speed -= .01
  }

  if (keyDown(LEFT_ARROW)) {
    speed += .01
  }

  if (keyDown(UP_ARROW)) {
    angle += .01;
  }

  if (keyDown(DOWN_ARROW)) {
    angle -= .01;
  }

  var c  = cos(angle);
  rotate(c)

  if (random() > speed) {
    var bargo = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
    bargo.addImage(Image);
    bargoSprites.add(bargo);
  }

  var firstBargo = bargoSprites[0];
  if (bargoSprites.length > 0 && firstBargo.position.x <= camera.position.x - (width/2 + firstBargo.width/2)) {
    removeSprite(firstBargo);
  }


  drawSprites();

}

//Make Background a Random Color on Click
function mouseClicked() {
    color_x = random(255)
    color_y = random(255)
    color_z = random(255)
    bargoSprites.removeSprites();

}
