const colors = [
  "#18A8DE",
  "#EE586E",
  "#1ED5C8",
  "#FF9CA8",
  "#38C555"
]
function animateLogo() {
  const rectShortLength = $('#logo-rect-short').attr('height');
  const rectLongLength = $('#logo-rect-long').attr('height');
  const showDelay = 1000;
  const showDuration = 1000;
  const duration = 2000;
  const initialDelay = showDelay + showDuration;

  $('#logo-dot-top, #logo-dot-bot').css('opacity',0);
  const afterShowDot = setTimeout(function() {
    $('#logo-dot-top, #logo-dot-bot').css('opacity',1);
    $('body').css('background-color','#FCFCFC');
  },initialDelay);
  const bodyColor = anime({
    targets: 'body',
    'background-color': ['rgb(252, 217, 0)','rgb(255,255,255)'],
    duration: duration,
    delay: initialDelay,
  })
  const moveDot = anime({
    targets: '#logo-dot-mid',
    translateX: [-rectShortLength,0],
    duration: duration,
    autoplay: false
  })
  const showDot = anime({
    targets: '#logo-dot-mid',
    translateX: [-rectShortLength,-rectShortLength],
    r: function(el) {
      const target = el.getAttribute('r');
      return [0,target]
    },
    delay: showDelay,
    duration: showDuration,
    complete: moveDot.play
  })
  const expandLong = anime({
    targets: '#logo-rect-long',
    height: function(el) {
      const bb = el.getBBox();
      const pathLength = bb.height;
      el.setAttribute('height', pathLength);
      return [0, pathLength];
    },
    y: function(el) {
      const bb = el.getBBox();
      return [bb.y+bb.height/2,bb.y]
    },
    duration: duration,
    delay: initialDelay,
  })
  const expandShort = anime({
    targets: '#logo-rect-short',
    height: function(el) {
      const bb = el.getBBox();
      const pathLength = bb.height;
      el.setAttribute('height', pathLength);
      return [0, pathLength];
    },
    y: function(el) {
      const bb = el.getBBox();
      return [bb.y+bb.height,bb.y]
    },
    duration: showDuration,
    delay: initialDelay,
    easing: "easeOutExpo"
  })
  const moveBotDot = anime({
    targets: '#logo-dot-top',
    translateY: [rectLongLength/2,0],
    duration: duration,
    delay: initialDelay,
  })
  const moveTopDot = anime({
    targets: '#logo-dot-bot',
    translateY: [-rectLongLength/2,0],
    duration: duration,
    delay: initialDelay,
  })
  anime({
    targets: '#logo-semi-circle',
    translateX: [-rectShortLength,0],
    opacity: [0,1],
    duration: duration,
    delay: initialDelay
  });
}
$(document).ready(function() {
  animateLogo();
})
