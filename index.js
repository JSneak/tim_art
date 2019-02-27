var color_x = 150
var color_y = 200
var color_z = 250
var speed = .99
var Image
var angle = 0.0;

var ground;
var ground_width = 50;
var ground_height = 50;
var numGround;

var bargoSprites;


function preload() {
  Image = loadImage("./timbargo1.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(color_x, color_y, color_z);

    ground = new Group();
    numGround = width/ground_width+1

    for (var n = 0; n < numGround; n++) {
      var groundSprite = createSprite(n*50, height-25, ground_width,ground_height);
      ground.add(groundSprite);
    }
    bargoSprites = new Group();
}

function draw() {
  background(color_x, color_y, color_z);

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


  if (random() > speed) {
    var bargo = createSprite(random((width-50)-15), random(0, (height-50)-15), 30, 30);
    bargo.addImage(Image);
    bargoSprites.add(bargo);
  }

  var c  = cos(angle);
  rotate(c)
  drawSprites();

}

//Make Background a Random Color on Click
function mouseClicked() {
    color_x = random(255)
    color_y = random(255)
    color_z = random(255)
    bargoSprites.removeSprites();

}
