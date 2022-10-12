var canvas = document.getElementById("canvas"); // Get the canvas element
canvas.height = 400;
canvas.width = window.innerWidth * 0.9;

var drawing = canvas.getContext("2d"); // Get the drawing context to draw on the canvas
var T = 0; // Time
var X0 = 0;
var Y0 = canvas.height;
var X = X0;
var Y = Y0;
var angle = 45;
var initialSpeed = 0.5;
var g = 9.8;

window.onload = init(); // init is called when the page is loaded

var oldTimeStamp = 0;
var secondsPassed = 0;
var animationSpeed = 1000;

function init() {
  window.requestAnimationFrame(animationLoop); // Start the animation loop
}

function animationLoop(timestamp) {
  secondsPassed = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;
  update();
  draw();
  window.requestAnimationFrame(animationLoop); // Call the animation loop again and again
  // console.log(timestamp);
}

function update() {
  T += secondsPassed * animationSpeed;
  X = X0 + T * initialSpeed * Math.cos((-angle * Math.PI) / 180); // x = x0 + vt
  Y =
    Y0 +
    T * initialSpeed * Math.sin((-angle * Math.PI) / 180) +
    0.5 * (g / 10000) * T * T; // y = y0 + vt - 0.5gt^2
}

function draw() {
  // drawing.fillStyle = "rgb(255, 25, 255, 0.1)";
  // drawing.fillRect(0, 0, canvas.width, canvas.height);
  drawing.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas before drawing again (otherwise the circle will be drawn on top of the previous circle)

  // Make circle
  drawing.beginPath();
  drawing.arc(X, Y, 10, 0, 2 * Math.PI); // (x,y,radius,startAngle,endAngle)
  drawing.fill();
}

// Form controls
var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  angle = document.getElementById("angle").value;
  initialSpeed = document.getElementById("initialSpeed").value;
  g = document.getElementById("gravity").value;
  T = 0;
});
