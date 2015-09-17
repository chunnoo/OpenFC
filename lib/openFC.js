function include(file) {
  document.write("<script type='text/javascript' src='" + file + "'></script>");
}

function OpenFC(canvasName, fullscreen) {
  //var self = this;
  
  include("lib/object.js");
  include("lib/matrix.js");
  
  this.canvas = document.getElementById(canvasName);
  this.context = this.canvas.getContext("2d");
  
  this.mouse = {
    x: 0,
    y: 0,
    leftButton: false,
    rightButton: false
  };
  
  this.framecount = 0;
  this.focus = true;
  
  this.objects = {};
  
  this.canvas.onmousemove = function(e) {
    e.preventDefault;
    this.mouse.x = e.clientX - (this.canvas.width/2);
    this.mouse.y = e.clientY - (this.canvas.height/2);
  }.bind(this);
  this.canvas.ontouchmove = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
  }.bind(this);
  //mouse release
  this.canvas.onmouseup = function(e) {
    this.mouse.x = e.clientX - (this.canvas.width/2);
    this.mouse.y = e.clientY - (this.canvas.height/2);
    this.mouse.leftButton = false;
    if (this.leftMouseUp) {
      this.leftMouseUp();
    }
  }.bind(this);
  this.canvas.onmouseleave = function(e) {
    this.mouse.x = e.clientX - (this.canvas.width/2);
    this.mouse.y = e.clientY - (this.canvas.height/2);
    this.mouse.leftButton = false;
    if (this.leftMouseUp) {
      this.leftMouseUp();
    }
  }.bind(this);
  this.canvas.ontouchend = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
    this.mouse.leftButton = false;
    if (this.leftMouseUp) {
      this.leftMouseUp();
    }
  }.bind(this);
  this.canvas.ontouchleave = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
    this.mouse.leftButton = false;
    if (this.leftMouseUp) {
      this.leftMouseUp();
    }
  }.bind(this);
  this.canvas.ontouchcancel = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
    this.mouse.leftButton = false;
    if (this.leftMouseUp) {
      this.leftMouseUp();
    }
  }.bind(this);
  //mouse press
  this.canvas.onmousedown = function(e) {
    this.mouse.x = e.clientX - (this.canvas.width/2);
    this.mouse.y = e.clientY - (this.canvas.height/2);
    this.mouse.leftButton = true;
    if (this.leftMouseDown) {
      this.leftMouseDown();
    }
  }.bind(this);
  this.canvas.onmouseenter = function(e) {
    this.mouse.x = e.clientX - (this.canvas.width/2);
    this.mouse.y = e.clientY - (this.canvas.height/2);
  }.bind(this);
  this.canvas.ontouchstart = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
    this.mouse.leftButton = true;
    if (this.leftMouseDown) {
      this.leftMouseDown();
    }
  }.bind(this);
  this.canvas.ontouchenter = function(e) {
    e.preventDefault();
    this.mouse.x = e.targetTouches[0].pageX - (this.canvas.width/2);
    this.mouse.y = e.targetTouches[0].pageY - (this.canvas.height/2);
  }.bind(this)
  
  window.addEventListener("keypress", function(e) {
    if (this.keypress) {
      this.keypress(e.charCode);
    }
  }.bind(this));
  window.addEventListener("load", function() {
    this.resize();
    this.begin();
  }.bind(this));
  window.addEventListener("blur", function() {
    this.focus = false;
  }.bind(this));
  window.addEventListener("focus", function() {
    this.focus = true;
    requestAnimationFrame(this.coreDraw.bind(this));
  }.bind(this));
  window.addEventListener("resize", function() {
    this.resize();
  }.bind(this));
}

OpenFC.prototype = {
  begin: function() {
    this.init();
    this.coreDraw();
  },
  coreDraw: function() {
    if (this.focus) {
      if (this.clearFrame) {
        this.clearFrame();
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.context.save();
      this.context.translate(this.canvas.width/2, this.canvas.height/2);
    
      this.draw();
    
      this.context.restore();
      this.framecount += 1;
    
      requestAnimationFrame(this.coreDraw.bind(this));
    }
  },
  resize: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
};




