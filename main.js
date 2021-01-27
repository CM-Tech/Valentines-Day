var c = document.getElementById("c");
var b = document;
var ctx = c.getContext("2d");
var hsize = 5;
var n = 1000;
var speed = 1;
var size = {
  x: document.body.clientWidth,
  y: window.innerHeight,
};

function textChanged(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  } else {
    setText(document.getElementById("text").value);
  }
}

function f() {
  var g = (i / 4) % size.x;
  var t = Math.floor(i / 4 / size.x);
  this.x = random(1) * speed;
  this.y = random(1) * speed;
  this.j = g;
  this.speed = t;
  this.a = random() * hsize;
  this.b = random() * hsize;
  this.f = 2 + random(1) * hsize; //put a 1 inside random for upside down hearts
  this.d = 0.05;
  this.g = "#f77";
  this.c = hsize + random(1) * hsize;
  this.heart = function () {
    he = wi = this.f;
    x = this.x;
    y = this.y;
    ctx.fillStyle = this.g;
    ctx.beginPath();
    ctx.moveTo(x + 0.5 * wi, y + 0.3 * he);
    ctx.bezierCurveTo(
      x + 0.1 * wi,
      y,
      x,
      y + 0.6 * he,
      x + 0.5 * wi,
      y + 0.9 * he
    );
    ctx.bezierCurveTo(
      x + 1 * wi,
      y + 0.6 * he,
      x + 0.9 * wi,
      y,
      x + 0.5 * wi,
      y + 0.3 * he
    );
    ctx.closePath();
    ctx.fill();
  };
  this.h = function () {
    x = this.x;
    y = this.y;
    b = this.c;
    l = this.j;
    hsize = this.speed;
    x < l - this.c && ((this.x = l - b), (this.a *= -1));
    x > l + this.c && ((this.x = l + b), (this.a *= -1));
    y < hsize - b && ((this.y = hsize - b), (this.b *= -1));
    y > hsize + b && ((this.y = hsize + b), (this.b *= -1));
  };
  this.i = function () {
    this.a > n && (this.heart.a = n);
    this.b > n && (this.heart.b = n);
    this.x += this.a * this.d;
    this.y += this.b * this.d;
    this.h();
  };
}

function background() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, size.x, size.y);
}

function random(neg) {
  var rand = Math.random();
  return neg ? 2 * rand - 1 : rand;
}

s = 0;
var pa = [];

document.getElementById("text").innerHTML = "happy";
setText("happy");

function setText(t) {
  size.x = window.innerWidth;
  size.y = window.innerHeight;
  c.width = size.x;
  c.height = size.y;
  speed = 1;
  pa = [];
  clearInterval(s);

  background();

  ctx.fillStyle = "black";
  let fontt="'Hachi Maru Pop'";
  ctx.font = 100 + "px "+fontt;
  var measure = ctx.measureText(t);
  let bbox = {
    x: measure.actualBoundingBoxLeft,
    y: -measure.actualBoundingBoxAscent,
    w: measure.actualBoundingBoxRight - measure.actualBoundingBoxLeft,
    h: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
  };
  var heightOfFont = Math.floor(
    Math.min(
      (c.width - 200) / (bbox.w / 100),
      (c.height - 200) / (bbox.h / 100)
    )
  );

  hsize = Math.min(
    Math.floor(heightOfFont / 20) + 1,
    Math.floor(Math.min(size.x, size.y) / 20) + 1
  );

  ctx.font = heightOfFont + "px "+fontt;
  mtext = ctx.measureText(t).width;
  measure = ctx.measureText(t);
  bbox = {
    x: measure.actualBoundingBoxLeft,
    y: -measure.actualBoundingBoxAscent,
    w: measure.actualBoundingBoxRight - measure.actualBoundingBoxLeft,
    h: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
  };

  ctx.fillText(
    t,
    (size.x + bbox.w) / 2 -
      measure.actualBoundingBoxRight +
      measure.actualBoundingBoxLeft,
    size.y / 2 - bbox.y - bbox.h / 2
  );

  ctext = ctx.getImageData(0, 0, size.x, size.y);
  pixtext = ctext.data;

  for (i = 0; i < pixtext.length; i += 4) {
    if (0 === pixtext[i] && (s++, 0 === s % hsize)) {
      var p = new f();
      p.heart();
      pa.push(p);
    }
  }
  s = setInterval(function () {
    background();
    for (var i in pa) {
      p = pa[i];
      p.i();
      p.heart();
    }
  }, speed);
}
window.onresize = ()=>{
    setText(document.getElementById("text").value);
}