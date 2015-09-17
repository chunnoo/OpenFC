var fc = new OpenFC("canvas", true);

fc.init = function() {
  this.objects = {
    square: new Object([-50,-50,50,-50,50,50,-50,50]),
    triangle: generatePolygon(3, 50)
  };
};

fc.draw = function() {

  this.objects.square.setSkew(Math.cos(this.framecount/30) * Math.PI/8, Math.cos(this.framecount/30) * Math.PI/8);
  this.objects.square.update(fc);
  
  var l = Math.sqrt((this.mouse.x - this.objects.triangle.posX)*(this.mouse.x - this.objects.triangle.posX) + (this.mouse.y - this.objects.triangle.posY)*(this.mouse.y - this.objects.triangle.posY));
  var d = 0.1;
  var k = 0.01;
  
  this.objects.triangle.setAcc(
    k*(this.mouse.x - this.objects.triangle.posX) - d*this.objects.triangle.velX*Math.abs(this.objects.triangle.velX),
    k*(this.mouse.y - this.objects.triangle.posY) - d*this.objects.triangle.velY*Math.abs(this.objects.triangle.velY));
  
  this.objects.triangle.setAngleVel(0.02);
  this.objects.triangle.update(fc);
  this.objects.triangle.transformMatrix.reset();

};

fc.clearFrame = function() {
  this.context.fillStyle = "rgba(255,255,255,0.25)";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.fillStyle = "#000";
};
