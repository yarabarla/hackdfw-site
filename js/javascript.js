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
    shape.scale = _.random(6,10)*.01; //The original SVGs are just this massive!
    shape.center();
    shapes.add(shape);
    if (!--count) generateShapes();
  }
});

//generate random shapes
function generateShapes() { 
  var rows = Math.floor(two.height / spacing);
  var cols = Math.floor(two.width / spacing);

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
      shape.name = j;

      shape.step = function() {
        this.translation.x += _.random(-1,1);
        this.translation.y += _.random(-1,1);
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
});

//make sure it runs after dom
$(function() {
  //get all divs linked to navbar
  var links = $('section.container').map(function() {
    var $this = $(this);
    return $('ul.nav li a').map(function() {
      if ($this.attr('id') == $(this).attr('href').replace('#',''))
        return $this;
    }).toArray();
  });
  $(window).scroll(function() {
    links.each(function() {
      var $this = $(this);
      if ($this.offset().top - 300 <= $(window).scrollTop()) {
        $('ul.nav li').each(function() {
          if ($(this).find('a').attr('href') == "#".concat($this.attr('id'))) {
            $('ul.nav li').removeClass('active'); 
            $(this).addClass('active');
            return false;
          }
        });
      }
    });
  });
});
