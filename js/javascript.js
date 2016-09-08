const colors = [
  "#18A8DE",
  "#EE586E",
  "#1ED5C8",
  "#FF9CA8",
  "#38C555"
]
//NOTE BODY BACKGROUND-COLOR SHOULD BE SET AND IT SHOULD BE RGB.
const bodyToWhite = anime({
  targets: 'body',
  'background-color': function() {
    const curr = $('body').css('background-color');
    console.log(curr);
    return [curr,'rgb(255,255,255)'];
  },
  autoplay: false
})
const bodyToYellow = anime({
  targets: 'body',
  'background-color': function() {
    const curr = $('body').css('background-color');
    return [curr,'rgb(252, 217, 0)'];
  },
  autoplay: false
})
function animateLogo() {
  const rectShortLength = $('#logo-rect-short').attr('x1')-$('#logo-rect-short').attr('x2');
  const rectLongLength =  $('#logo-rect-long').attr('y2')-$('#logo-rect-short').attr('y1');
  const showDelay = 1000;
  const showDuration = 1000;
  const duration = 2000;
  const initialDelay = showDelay + showDuration;

  $('#logo-dot-top, #logo-dot-bot').css('opacity',0);
  const afterShowDot = setTimeout(function() {
    $('#logo-dot-top, #logo-dot-bot').css('opacity',1);
  },initialDelay);
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
    complete: function() {
      moveDot.play()
      bodyToWhite.play()
    }
  })
  const expandLong = anime({
    targets: '#logo-rect-long',
    'stroke-dasharray': [rectLongLength*2,rectLongLength*2],
    'stroke-dashoffset': [rectLongLength*2,0],
    translateY: [rectLongLength,0],
    duration: 900,
    delay: initialDelay,
    easing: "easeOutExpo"
  })
  const expandShort = anime({
    targets: '#logo-rect-short',
    'stroke-dasharray': [rectShortLength,rectShortLength],
    'stroke-dashoffset': [rectShortLength,0],
    translateX: [-rectShortLength,0],
    duration: 800,
    delay: initialDelay,
    easing: "easeOutExpo"
  })
  const moveBotDot = anime({
    targets: '#logo-dot-top',
    translateY: [rectLongLength/2+50,0],
    duration: duration,
    delay: initialDelay,
  })
  const moveTopDot = anime({
    targets: '#logo-dot-bot',
    translateY: [-rectLongLength/2-50,0],
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
function animateTitle() {
  const delay = 2500;
  //done by replacing title with spans
  const letters = $('#overview .title').html();
  $('#overview .title').html('');
  for (var i=0;i<letters.length;i++) {
    const span = $('<span/>').css('display','inline-block').html(letters[i]).appendTo('#overview .title');
    anime({
      targets: span[0],
      opacity: [0,1],
      translateY: [20,0],
      delay: delay+i*50
    })
  }
}
function animateHeader() {
  const delay = 3000;
  const animateSubtitle = anime({
    targets: '#overview .subtitle',
    opacity: [0,1],
    translateY: [10,0],
    delay: delay
  })
  const animateButtons = anime({
    targets: '#overview .buttons',
    opacity: [0,1],
    translateY: [10,0],
    delay: delay+200
  })
}
function onScroll() {
  $(window).scroll(function(e) {
    const curr = $(document).scrollTop();
    const wHeight = $(window).height();
    $('section.container').each(function(i) {
      const top = $(this).offset().top;
      const height = $(this).height();
      if (curr+wHeight > top+300 && curr < top+height) {
        if (i%2)
          $('body').removeClass('white').addClass('yellow')
        else
          $('body').removeClass('yellow').addClass('white')
        return;
      }
    })
  })
}
$(window).ready(function() {
  $('.jumbotron').removeClass('hidden');
  animateLogo();
  animateTitle();
  animateHeader();
  onScroll();
})
