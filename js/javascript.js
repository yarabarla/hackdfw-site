//Config
var elem = document.getElementById("background");
var params = {
  //params here
  autostart : true,
  width : $(window).width(),
  height : $(window).height()
};
var colors = [
  "#18A8DE",
  "#EE586E",
  "#1ED5C8",
  "#FF9CA8",
  "#38C555"
]
var spacing = 200;

//start this shit
var two = new Two(params).appendTo(elem);

var shapes = two.makeGroup(); //group of all different shapes
var particles = two.makeGroup(); //group of all unique particles from shapes

//find all shapes
var objects = $('#shapes object');
var count = objects.length;
objects.each(function(i, el) {
  el.onload = function() {
    var shape = two.interpret($(el).contents().find('svg')[0]);
    shape.visible = false;
    shape.scale = .08; //The original SVGs are just this massive!
    shape.center();
    shapes.add(shape);
    if (!--count) generateShapes();
  }
});

//generate random shapes
function generateShapes() {
  var rows = Math.floor(two.height / spacing);
  var cols = Math.floor(two.width / spacing);

  animations = {
    "vertical" : function(shape, counter, maxRange) {
      shape.translation.y += counter;
    },
    "horizontal" : function(shape, counter, maxRange) {
      shape.translation.x += counter;
    },
    "diagonal" : function(shape, counter, maxRange) {
      shape.translation.y += counter;
      shape.translation.x += counter;
    },
    "spinningHorizontal" : function(shape, counter, maxRange) {
      shape.translation.x += counter;
      shape.rotation += counter/maxRange*Math.PI/2;
    },
    "spinningVertical" : function(shape, counter, maxRange) {
      shape.translation.y += counter;
      shape.rotation += counter/maxRange*Math.PI/2;
    }
  }

  for (var i = 0; i < rows; i++) {
    var even = !!(i % 2);

    for (var j = 0; j < cols - 1; j++) {
      var k = j;

      if (even) k += 0.5;

      var vi = i / (rows - 1);
      if (!!(j % 2))
        vi = (i - 0.5) / (rows - 1);

      var hi = k / (cols - 1);
      var shape = _.sample(shapes.children).clone();

      shape.fill = _.sample(colors);
      shape.opacity = 1;
      shape.visible = true;
      shape.translation.set(hi * two.width, vi * two.height);

      var maxRange = 40;
      // shape.counter = _.random(-maxRange,maxRange);
      shape.counter = 0;
      shape.direction = !!_.random(0,1); //true is up, false is down

      shape.maxWait = _.random(5,10);
      shape.wait = 0;

      shape.animation = _.sample(_.keys(animations));

      console.log(shape.animation);

      shape.count = function() {

        if (this.counter >= maxRange || this.counter <= -maxRange)
          this.direction = !this.direction;
        if (this.direction)
          this.counter++;
        else
          this.counter--;

        // if (this.wait > 0) {
        //   this.wait--;
        //   console.log("waiting " + maxRange  + " " + this.counter);
        //   return false;
        // }
        // if (Math.abs(this.counter) == maxRange && this.wait == 0)
        //   this.wait = this.maxWait;

        return true;
      }
      shape.step = function() {
        if (!this.count()) return;
        animations[this.animation](this, this.counter/30, maxRange);
      }
      particles.add(shape);
    }
  }
}

//main animation
two.bind('update',function() {
  _.each(particles.children,function(child) {
    child.step();
  });
  // _.first(particles.children).step();
});

//make sure it runs after dom
$(function() {
  //make things reveal when you scroll to it.
  window.scrollReveal = ScrollReveal({
    reset: true
  });
  scrollReveal.reveal('.rev');

  //make navbar transition
  $('#navbar').onePageNav({
    currentClass: 'active'
  });

});
